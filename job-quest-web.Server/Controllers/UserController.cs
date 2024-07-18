using Microsoft.AspNetCore.Mvc;
using JQ.BusinessLayer;
using job_quest_dotnet.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using job_quest_web.Server.Service;
namespace JQ.Controllers
{
    [ApiController]
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserBL _userBL;

        public UserController(ILogger<UserController> logger, UserBL userBL)
        {
            _logger = logger;
            _userBL = userBL;
        }
        [Authorize]
        [HttpGet("GetCandidateCount")]
        public async Task<List<UserProfile>> GetUserProfile()
        {
            string email = CommonUtility.GetUserEmail(HttpContext);
            return await _userBL.GetUserProfile(email);
        }
    }
}
