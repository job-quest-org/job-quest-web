using Microsoft.Data.SqlClient;
using job_quest_dotnet.JQApiConstants;
using job_quest_dotnet.JQSqlConstants;
using job_quest_dotnet.Mapper;
using job_quest_web.Server.Service;
using System.Data;

namespace JQ.BusinessLayer
{
    public class AuthenticationBL 
    {
        private readonly ILogger<AuthenticationBL> _logger;
        private readonly ICloudUtility _cloudUtility;
        
        public AuthenticationBL(ILogger<AuthenticationBL> logger, ICloudUtility cloudUtility)
        {
            _logger = logger;
            _cloudUtility = cloudUtility;
        }
        public async void UserProfileVerification(string firstName, string lastName, string email)
        {
            int res = 0;
            var secrets = await _cloudUtility.GetRdsSecret();
            string? constr = await _cloudUtility.GetDbConnectionString(secrets);
            using (SqlConnection connection = new SqlConnection(constr))
            {
                await connection.OpenAsync();
                using (SqlCommand cmd = new SqlCommand(JQSqlConstants.SpUserProfileVerification, connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@FirstName", firstName);
                    cmd.Parameters.AddWithValue("@LastName", lastName);
                    cmd.Parameters.AddWithValue("@Email", email);
                    res = Convert.ToInt32(await cmd.ExecuteNonQueryAsync());
                }
            }
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
