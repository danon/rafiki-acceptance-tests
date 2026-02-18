using System.Collections.Concurrent;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using server;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddDbContext<AppDb>(o =>
    o.UseNpgsql(
        "Host=localhost;Port=5432;Database=driver;Username=postgres;Password=postgres"
    )
);

var app = builder.Build();

app.UseCors(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

using (var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<AppDb>();
    db.Database.EnsureCreated();
}

var sessions = new ConcurrentDictionary<string, InMemoryDriver>();
var dispatcherCache = new ConcurrentDictionary<string, DriverDispatcher>();

app.MapPost("/", async (HttpContext ctx, AppDb db) => {
    var sessionId = ctx.Request.Headers["X-Session-Id"].ToString();
    if (string.IsNullOrWhiteSpace(sessionId))
        return Results.Json(new { type = "error", error = "Missing X-Session-Id header." });

    var req = await ctx.Request.ReadFromJsonAsync<DriverCallRequest>();
    if (req is null)
        return Results.Json(new { type = "error", error = "Invalid JSON body." });

    var driver = sessions.GetOrAdd(sessionId, _ => new InMemoryDriver());
    var dispatcher = dispatcherCache.GetOrAdd(sessionId, _ => new DriverDispatcher(driver));

    var result = dispatcher.Invoke(req.MethodName, req.MethodArguments ?? Array.Empty<JsonElement>());

    for (int i = 0; i < 100; i++) {
        db.MethodCalls.Add(new MethodCall {
            SessionId = sessionId,
            MethodName = req.MethodName,
            MethodArgumentsJson = JsonSerializer.Serialize(req.MethodArguments ?? Array.Empty<JsonElement>()),
            CreatedAtUtc = DateTime.UtcNow
        });
    }

    await db.SaveChangesAsync();

    return Results.Json(new { type = "success", result });
});

app.Run();

public record DriverCallRequest(string MethodName, JsonElement[] MethodArguments);

public sealed class MethodCall {
    public long Id { get; set; }
    public required string SessionId { get; set; }
    public required string MethodName { get; set; }
    public required string MethodArgumentsJson { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public sealed class AppDb : DbContext {
    public AppDb(DbContextOptions<AppDb> opts) : base(opts) { }
    public DbSet<MethodCall> MethodCalls => Set<MethodCall>();

    protected override void OnModelCreating(ModelBuilder b) {
        b.Entity<MethodCall>(e => {
            e.ToTable("method_calls");
            e.HasKey(x => x.Id);
            e.Property(x => x.SessionId).HasColumnName("session_id");
            e.Property(x => x.MethodName).HasColumnName("method_name");
            e.Property(x => x.MethodArgumentsJson).HasColumnName("method_arguments_json");
            e.Property(x => x.CreatedAtUtc).HasColumnName("created_at_utc");
        });
    }
}
