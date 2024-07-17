using Amazon;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Microsoft.Extensions.Caching.Memory;
namespace job_quest_web.Server.Service
{
    public interface ICloudUtility
    {
        public Task<Dictionary<string, string>> GetIdpSecret();

        public Task<Dictionary<string, string>> GetRdsSecret();

        public Task<string> GetDbConnectionString(Dictionary<string, string> secrets);
    }
}