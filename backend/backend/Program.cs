using backend.Models;

var builder = WebApplication.CreateBuilder(args);
var  policyName = "all_cors";

// Adding cors
builder.Services.AddCors(o =>
{
    o.AddPolicy(policyName, builder =>
    {
        builder.WithOrigins("*")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddScoped<UserDetailContext>(s => UserDetailContext.instance);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.UseCors(policyName);

app.Run();

