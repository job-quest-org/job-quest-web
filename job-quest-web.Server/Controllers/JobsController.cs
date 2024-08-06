using Microsoft.AspNetCore.Mvc;
using JQ.BusinessLayer;
using job_quest_dotnet.Models;
using job_quest_web.Server.Service;
namespace JQ.Controllers
{
    [ApiController]
    [Route("api/jobs")]
    public class JobsController : ControllerBase
    {
        private readonly ILogger<JobsController> _logger;
        private readonly JobsBL _jobsBL;

        public JobsController(ILogger<JobsController> logger, JobsBL jobsBL)
        {
            _logger = logger;
            _jobsBL = jobsBL;
        }

        [HttpGet()]
        public async Task<List<JobView>> GetJobList()
        {
            return await _jobsBL.GetJobsList();
        }

    }
}
