using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using LoginSystem.Backend.Services;
using Microsoft.EntityFrameworkCore;
using TunedIn.Server.Data;
using TunedIn.Server.Services;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Get the connection string from environment variable or fall back to configuration
var connectionString = Environment.GetEnvironmentVariable("DatabaseConnection")
    ?? builder.Configuration.GetConnectionString("DatabaseConnection");

// Configure JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(
                Environment.GetEnvironmentVariable("JwtSecret") ??
                builder.Configuration["Jwt:Secret"] ??
                throw new InvalidOperationException("JWT secret not configured")
            )),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

// Configure Email Services
var emailSettings = builder.Configuration.GetSection("EmailSettings").Get<EmailSettings>();
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddScoped<ILoggingService, LoggingService>();
builder.Services.AddSingleton<EmailTemplateService, EmailTemplateService>();
builder.Services.AddScoped<EmailService, EmailService>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString,
    ServerVersion.AutoDetect(connectionString)));

// Register other services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<MembershipService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var connection = new MySqlConnection(connectionString))
{
    try
    {
        connection.Open();
        using (var command = new MySqlCommand("SHOW TABLES;", connection))
        using (var reader = command.ExecuteReader())
        {
            Console.WriteLine("\nDatabase Tables:");
            Console.WriteLine("----------------");
            while (reader.Read())
            {
                Console.WriteLine($"Table: {reader.GetString(0)}");
            }
            Console.WriteLine("----------------\n");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error listing tables: {ex.Message}");
    }
}


app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();