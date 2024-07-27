using Microsoft.Data.SqlClient;
using job_quest_dotnet.JQApiConstants;
using job_quest_dotnet.JQSqlConstants;
using job_quest_dotnet.Mapper;
using job_quest_dotnet.Models;
using job_quest_web.Server.Service;
using System.Text.Json.Serialization;
using System.Text.Json;

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


        public async Task<CandidateProfile> GetCandidateProfile(string email)
        {
            CandidateProfile response = new CandidateProfile();
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
                            response = GetUserProfileMapper.MapObject(reader);
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
        public async Task<CandidateProfile> UpdateCandidateProfile(CandidateProfile payload)
        {
            CandidateProfile response = new CandidateProfile();
            try
            {
                var secrets = await _cloudUtility.GetRdsSecret();
                string? constr = await _cloudUtility.GetDbConnectionString(secrets);
                using (SqlConnection connection = new SqlConnection(constr))
                {
                    await connection.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand(JQSqlConstants.GetUserProfileSql, connection))
                    {
                        cmd.Parameters.AddWithValue("@payload", JsonSerializer.Serialize(payload));
                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            response = GetUserProfileMapper.MapObject(reader);
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
        public async Task<int> GetCandidateCount()
        {
            int res = 0;
            var secrets = await _cloudUtility.GetRdsSecret();
            string? constr = await _cloudUtility.GetDbConnectionString(secrets);
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
            try
            {
                var secrets = await _cloudUtility.GetRdsSecret();
                string? constr = await _cloudUtility.GetDbConnectionString(secrets);
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
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
            return response;
        }
    }
   
}
