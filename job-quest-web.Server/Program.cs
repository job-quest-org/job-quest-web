using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using job_quest_dotnet.JQApiConstants;
using JQ.BusinessLayer;
using System.Security.Claims;
using job_quest_web.Server.Service;

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
        options.ExpireTimeSpan = TimeSpan.FromDays(1); 
        options.Events.OnSigningIn = async context =>
        {
            var claimsIdentity = context.Principal.Identity as ClaimsIdentity;
            if (claimsIdentity != null)
            {
                claimsIdentity.AddClaim(new Claim("IsAuthenticated", "true"));
            }
        };
    })
    .AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
    {
        options.ClientId = Environment.GetEnvironmentVariable(JQApiConstants.JQOidcClientId);
        options.ClientSecret = Environment.GetEnvironmentVariable(JQApiConstants.JQOidcClientSecret);
    });
// Add services to the container.
var services = builder.Services;
services.AddControllers();
services.AddMemoryCache();
services.AddSingleton<ICloudUtility, CloudUtility>();
services.AddScoped<CandidateBL>();
services.AddScoped<JobsBL>();
services.AddScoped<RecruiterBL>();
services.AddScoped<UserBL>();
services.AddScoped<AuthenticationBL>();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddCors(options =>
{
    options.AddPolicy("JobQuestPolicy", builder =>
    {
        builder.WithOrigins("https://localhost:5173") 
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
    });
});
services.AddHttpClient();

var app = builder.Build();

//Fetch AWS secrets
var cloudUtility = app.Services.GetRequiredService<ICloudUtility>();
var idpSecret = await cloudUtility.GetRdsSecret();
var rdsSecret = await cloudUtility.GetRdsSecret();

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
