using job_quest_web.Server.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
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
                RedirectUri = Url.Action("Response")
            };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [EnableCors("JobQuestPolicy")]
        [HttpGet("response")]
        public async Task<IActionResult> Response()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
           
            // Redirect to frontend URL
            return Redirect("https://localhost:5173/");
        }
        [EnableCors("JobQuestPolicy")]
        [HttpGet("user")]
        public async Task<IActionResult> User()
        {
            var claims = HttpContext.User.Claims.ToList();
            if (claims.Count() == 0)
            {
                return Ok(new CustomClaim());
            }
            else
            {
                var customClaims = new CustomClaim
                {
                    Name = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                    Email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                    Issuer = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Issuer,
                    IsAuthenticated = claims.FirstOrDefault(c => c.Type == "IsAuthenticated")?.Value,
                };

                // Serialize claims to JSON
                var json = JsonSerializer.Serialize(customClaims, new JsonSerializerOptions());

                // Redirect to frontend URL
                return Ok(json);
            }

        }
    }
}
