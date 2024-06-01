using job_quest_web.Server.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
namespace JQ.Controllers
{
    [ApiController]
    [Route("/")]
    [EnableCors("JobQuestPolicy")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(ILogger<AuthenticationController> logger)
        {
            _logger = logger;
        }

        [EnableCors("JobQuestPolicy")]
        [HttpGet("login")]
        public IActionResult Login()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("User")
            };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [EnableCors("JobQuestPolicy")]
        [HttpGet("response")]
        public async Task<IActionResult> Response()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var claims = result?.Principal?.Claims?.ToList();

            // Serialize claims to JSON
            var json = JsonSerializer.Serialize(claims, new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve // to prevent circular references in claims object later it should be handled with model
            });

            return Ok(json);
        }
        [EnableCors("JobQuestPolicy")]
        [HttpGet("user")]
        public async Task<IActionResult> User()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var claims = result?.Principal?.Claims?.ToList();
            var customClaims = new CustomClaim
            {
                Name = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                Email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                Issuer = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Issuer,
                IsAuthenticated = claims?.FirstOrDefault(c => c.Type == "IsAuthenticated")?.Value,
            };  

            // Serialize claims to JSON
            var json = JsonSerializer.Serialize(customClaims, new JsonSerializerOptions());

            // Redirect to frontend URL
            return Redirect("https://localhost:5173/User/?data=" + Uri.EscapeDataString(json));
        }
    }
}
