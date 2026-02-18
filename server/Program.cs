using System.Collections.Concurrent;
using System.Text.Json;
using server;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();

app.UseCors(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

var sessions = new ConcurrentDictionary<string, InMemoryDriver>();
var dispatcherCache = new ConcurrentDictionary<string, DriverDispatcher>();

app.MapPost("/", async (HttpContext ctx) =>
{
    var sessionId = ctx.Request.Headers["X-Session-Id"].ToString();
    if (string.IsNullOrWhiteSpace(sessionId))
        return Results.Json(new { type = "error", error = "Missing X-Session-Id header." });

    var req = await ctx.Request.ReadFromJsonAsync<DriverCallRequest>();
    if (req is null)
        return Results.Json(new { type = "error", error = "Invalid JSON body." });

    var driver = sessions.GetOrAdd(sessionId, _ => new InMemoryDriver());
    var dispatcher = dispatcherCache.GetOrAdd(sessionId, _ => new DriverDispatcher(driver));

    try
    {
        var result = dispatcher.Invoke(req.MethodName, req.MethodArguments ?? Array.Empty<JsonElement>());
        return Results.Json(new { type = "success", result });
    }
    catch (Exception ex)
    {
        return Results.Json(new { type = "error", error = ex.Message });
    }
});

app.Run();

public record DriverCallRequest(string MethodName, JsonElement[] MethodArguments);
