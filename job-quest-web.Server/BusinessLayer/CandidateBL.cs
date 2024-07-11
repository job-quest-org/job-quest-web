using Microsoft.Data.SqlClient;
using job_quest_dotnet.JQApiConstants;
using job_quest_dotnet.JQSqlConstants;
using job_quest_dotnet.Mapper;
using job_quest_dotnet.Models;
using job_quest_web.Server.Service;

namespace JQ.BusinessLayer
{
    public class CandidateBL
    {
        private readonly ILogger<CandidateBL> _logger;
        private readonly ICloudUtility _cloudUtility;
        public CandidateBL(ILogger<CandidateBL> logger, ICloudUtility cloudUtility)
        {
            _logger = logger;
            _cloudUtility = cloudUtility;
        }

        public async Task<int> GetCandidateCount()
        {
            int res = 0;
            var secrets = await _cloudUtility.GetRdsSecret();
            string? constr = secrets["connection"];
            using (SqlConnection connection = new SqlConnection(constr))
            {
                await connection.OpenAsync();
                using (SqlCommand cmd = new SqlCommand(JQSqlConstants.GetCandidateCount, connection))
                {
                    res = Convert.ToInt32(await cmd.ExecuteScalarAsync());
                }
            }
            return res;
        }

        public async Task<List<string>> GetCandidateList()
        {
            List<string> response = new List<string>();
            var secrets = await _cloudUtility.GetRdsSecret();
            string? constr = secrets["connection"];
            using (SqlConnection connection = new SqlConnection(constr))
            {
                await connection.OpenAsync();
                using (SqlCommand cmd = new SqlCommand(JQSqlConstants.GetCandidateList, connection))
                {
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        response = GetCandidateListMapper.MapObject(reader);
                    }
                }
            }
            return response;
        }
    }
   
}
