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
                RedirectUri = Url.Action("Response")
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
    }
}
