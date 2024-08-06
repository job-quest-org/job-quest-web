using Microsoft.AspNetCore.Mvc;
using JQ.BusinessLayer;
using job_quest_dotnet.Models;
using job_quest_web.Server.Service;
namespace JQ.Controllers
{
    [ApiController]
    [Route("api/recruiter")]
    public class RecruiterController : ControllerBase
    {
        private readonly ILogger<RecruiterController> _logger;
        private readonly RecruiterBL _recruiterBL;

        public RecruiterController(ILogger<RecruiterController> logger, RecruiterBL recruiterBL)
        {
            _logger = logger;
            _recruiterBL = recruiterBL;
        }

        [HttpGet("profile")]
        public async Task<RecruiterProfile> GetCandidateProfile()
        {
            string email = CommonUtility.GetUserEmail(HttpContext);
            return await _recruiterBL.GetRecruiterProfile(email);
        }

        [HttpPost("profile")]
        public async Task<RecruiterProfile> UpdateUserProfile(RecruiterProfile payload)
        {
            string email = CommonUtility.GetUserEmail(HttpContext);
            RecruiterProfile response = new RecruiterProfile();
            if (payload.Email == email)
            {
                response = await _recruiterBL.UpdateRecruiterProfile(payload);
            }
            if (response.Email == null)
            {
                throw new Exception();
            }
            return response;
        }
    }
}
