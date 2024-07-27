using Microsoft.AspNetCore.Mvc;
using JQ.BusinessLayer;
namespace JQ.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserBL _userBL;

        public UserController(ILogger<UserController> logger, UserBL userBL)
        {
            _logger = logger;
            _userBL = userBL;
        }
        
    }
}
