using job_quest_web.Server.Models;
using JQ.BusinessLayer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;
namespace JQ.Controllers
{
    [ApiController]
    [Route("/")]
    [EnableCors("JobQuestPolicy")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly AuthenticationBL _authenticationBL;

        public AuthenticationController(ILogger<AuthenticationController> logger, AuthenticationBL authenticationBL)
        {
            _logger = logger;
            _authenticationBL = authenticationBL;
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
            string email = result.Principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value.ToString();
            string firstName = result.Principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value.ToString();
            string lastName = result.Principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname)?.Value.ToString();
            if (!string.IsNullOrWhiteSpace(email))
            {
                _authenticationBL.UserVerification(firstName, lastName, email);
            }
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
                    FirstName = claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value,
                    //LastName = claims.FirstOrDefault(c => c.Type == ClaimTypes.family )?.Value,
                    Email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                    Issuer = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Issuer,
                    IsAuthenticated = claims.FirstOrDefault(c => c.Type == "IsAuthenticated")?.Value,
                    Role = "Candidate",
                };

                // Serialize claims to JSON
                var json = JsonSerializer.Serialize(customClaims, new JsonSerializerOptions());

                // Redirect to frontend URL
                return Ok(json);
            }
        }

        [EnableCors("JobQuestPolicy")]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            HttpContext.Response.Cookies.Delete("JQ_cookie");
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Redirect("https://localhost:5173/");
        }
    }
}
