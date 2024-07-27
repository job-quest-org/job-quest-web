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
    [Route("api/candidate")]
    public class CandidateController : ControllerBase
    {
        private readonly ILogger<CandidateController> _logger;
        private readonly CandidateBL _candidateBL;

        public CandidateController(ILogger<CandidateController> logger, CandidateBL candidateBL)
        {
            _logger = logger;
            _candidateBL = candidateBL;
        }

        [HttpGet("profile")]
        public async Task<CandidateProfile> GetCandidateProfile()
        {
            string email = CommonUtility.GetUserEmail(HttpContext);
            return await _candidateBL.GetCandidateProfile(email);
        }

        [HttpPost("profile")]
        public async Task<CandidateProfile> UpdateUserProfile(CandidateProfile payload)
        {
            string email = CommonUtility.GetUserEmail(HttpContext);
            if (payload.Email == email)
            {
                return await _candidateBL.UpdateCandidateProfile(payload);
            }
            else
            {
                throw new Exception();
            }
        }

        [Authorize]
        [HttpGet("GetCandidateCount")]
        public async Task<int> CandidateCount()
        {
            var principal = HttpContext.User.Identity as ClaimsIdentity;

            int res = await _candidateBL.GetCandidateCount();
            return res;
        }

        [HttpGet("GetCandidateList")]
        public async Task<List<string>> CandidateList()
        {
            return await _candidateBL.GetCandidateList();
        }
    }
}
