using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using job_quest_dotnet.JQApiConstants;
using JQ.BusinessLayer;
using JQ.Controllers;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

//Add authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
    {
        options.LoginPath = "/login";
        options.LogoutPath = "/logout";
        options.Cookie.Name = "JQ_cookie";
        options.Cookie.HttpOnly = true;
        options.Events.OnSigningIn = async context =>
        {
            var claimsIdentity = context.Principal.Identity as ClaimsIdentity;
            if (claimsIdentity != null)
            {
                claimsIdentity.AddClaim(new Claim("IsAuthenticated", "true"));
            }
        };
        //options.Cookie.SecurePolicy = Microsoft.AspNetCore.Http.CookieSecurePolicy.Always;
        //options.Cookie.IsEssential = true;
        //options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Lax;//default is Lax even if not provided
    })
    .AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
    {
        options.ClientId = Environment.GetEnvironmentVariable(JQApiConstants.JQOidcClientId);
        options.ClientSecret = Environment.GetEnvironmentVariable(JQApiConstants.JQOidcClientSecret);
    });
// Add services to the container.
var services = builder.Services;
services.AddControllers();
services.AddScoped<CandidateBL>();

services.AddScoped<AuthenticationController>();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddCors(options =>
{
    options.AddPolicy("JobQuestPolicy", builder =>
    {
        builder.WithOrigins("https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
services.AddHttpClient();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();


// Add CORS configuration
app.UseCors("JobQuestPolicy");

app.UseAuthentication(); // Add authentication middleware

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
