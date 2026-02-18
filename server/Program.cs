var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();
app.UseCors(p => p
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
);
app.MapPost("/", () => Results.Json(new { ok = true }));
app.Run();
