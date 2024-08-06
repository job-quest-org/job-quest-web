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
    public class RecruiterBL
    {
        private readonly ILogger<RecruiterBL> _logger;
        private readonly ICloudUtility _cloudUtility;
        public RecruiterBL(ILogger<RecruiterBL> logger, ICloudUtility cloudUtility)
        {
            _logger = logger;
            _cloudUtility = cloudUtility;
        }


        public async Task<RecruiterProfile> GetRecruiterProfile(string email)
        {
            RecruiterProfile response = new RecruiterProfile();
            try
            {
                var secrets = await _cloudUtility.GetRdsSecret();
                string? constr = await _cloudUtility.GetDbConnectionString(secrets);
                using (SqlConnection connection = new SqlConnection(constr))
                {
                    await connection.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand(JQSqlConstants.GetUserProfileSql, connection))
                    {
                        cmd.Parameters.AddWithValue("@email", email);
                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            response = GetRecruiterProfileMapper.MapObject(reader);
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
        public async Task<RecruiterProfile> UpdateRecruiterProfile(RecruiterProfile payload)
        {
            RecruiterProfile response = new RecruiterProfile();
            try
            {
                var secrets = await _cloudUtility.GetRdsSecret();
                string? constr = await _cloudUtility.GetDbConnectionString(secrets);
                using (SqlConnection connection = new SqlConnection(constr))
                {
                    await connection.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand(JQSqlConstants.SpUpdateRecruiterProfile, connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@payload", JsonSerializer.Serialize(payload));
                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            response = GetRecruiterProfileMapper.MapObject(reader);
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
