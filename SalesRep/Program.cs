using Microsoft.EntityFrameworkCore;
using SalesRep.Data;
using SalesRep.Services;
using SalesRep.Repositories;
using AutoMapper;
using FluentValidation.AspNetCore;
using Serilog;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Logging
builder.Host.UseSerilog((ctx, lc) => lc
    .WriteTo.Console()
    .ReadFrom.Configuration(ctx.Configuration));

// Add services
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

builder.Services.AddScoped<ISalesRepService, SalesRepService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllers().AddFluentValidation(fv =>
    fv.RegisterValidatorsFromAssemblyContaining<Program>());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactDev");

// app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Serve React static files
var clientAppPath = Path.Combine(app.Environment.ContentRootPath, "ClientApp", "build");
if (Directory.Exists(clientAppPath))
{
    app.UseDefaultFiles(new DefaultFilesOptions
    {
        FileProvider = new PhysicalFileProvider(clientAppPath),
        RequestPath = ""
    });
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(clientAppPath),
        RequestPath = ""
    });
}

// Fallback route to serve index.html (for React Router SPA)
app.MapFallback(async context =>
{
    if (File.Exists(Path.Combine(clientAppPath, "index.html")))
    {
        context.Response.ContentType = "text/html";
        await context.Response.SendFileAsync(Path.Combine(clientAppPath, "index.html"));
    }
    else
    {
        context.Response.StatusCode = 404;
    }
});

app.Run();
