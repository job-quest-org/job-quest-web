using Microsoft.Data.SqlClient;
using job_quest_dotnet.JQApiConstants;
using job_quest_dotnet.JQSqlConstants;
using job_quest_dotnet.Mapper;
using job_quest_dotnet.Models;
using job_quest_web.Server.Service;
using System.Text.Json;
using System.Data;

namespace JQ.BusinessLayer
{
    public class JobsBL
    {
        private readonly ILogger<JobsBL> _logger;
        private readonly ICloudUtility _cloudUtility;
        public JobsBL(ILogger<JobsBL> logger, ICloudUtility cloudUtility)
        {
            _logger = logger;
            _cloudUtility = cloudUtility;
        }


        public async Task<List<JobView>> GetJobsList()
        {
            List<JobView> response = new List<JobView>();
            try
            {
                var secrets = await _cloudUtility.GetRdsSecret();
                string? constr = await _cloudUtility.GetDbConnectionString(secrets);
                using (SqlConnection connection = new SqlConnection(constr))
                {
                    await connection.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand(JQSqlConstants.GetJobsList, connection))
                    {
                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            response = GetAllJobsListMapper.MapObject(reader);
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
            return response;
        }
    }
   
}
