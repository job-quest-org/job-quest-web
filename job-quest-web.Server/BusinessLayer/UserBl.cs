using Microsoft.Data.SqlClient;
using job_quest_dotnet.JQApiConstants;
using job_quest_dotnet.JQSqlConstants;
using job_quest_dotnet.Mapper;
using job_quest_dotnet.Models;
using job_quest_web.Server.Service;

namespace JQ.BusinessLayer
{
    public class UserBL
    {
        private readonly ILogger<UserBL> _logger;
        private readonly ICloudUtility _cloudUtility;
        public UserBL(ILogger<UserBL> logger, ICloudUtility cloudUtility)
        {
            _logger = logger;
            _cloudUtility = cloudUtility;
        }

        public async Task<List<CandidateProfile>> GetAllUserProfile()
        {
            List<CandidateProfile> response = new List<CandidateProfile>();
            try
            {
                var secrets = await _cloudUtility.GetRdsSecret();
                string? constr = await _cloudUtility.GetDbConnectionString(secrets);
                using (SqlConnection connection = new SqlConnection(constr))
                {
                    await connection.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand(JQSqlConstants.GetAllUserProfileSql, connection))
                    {
                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            response = GetAllUserProfileMapper.MapObject(reader);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return response;
        }
    }
   
}
