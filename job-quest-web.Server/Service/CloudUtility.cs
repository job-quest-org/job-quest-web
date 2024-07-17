using Amazon;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Caching.Memory;
using System.Runtime.Intrinsics.X86;
using System;
using Microsoft.AspNetCore.Routing;
namespace job_quest_web.Server.Service
{
    public class CloudUtility : ICloudUtility
    {
        private readonly IMemoryCache _cache;
        private readonly IAmazonSecretsManager _secretsManager;
        private static readonly TimeSpan _cacheExpiration = TimeSpan.FromDays(1);
        private const string idpSecretName = "dev/JQ/IdP_Secret";
        private const string rdsSecretName = "dev/JQ/DB_Secret";
        private const string Region = "ap-south-1";

        public CloudUtility(IMemoryCache cache)
        {
            _cache = cache;
            _secretsManager = new AmazonSecretsManagerClient(RegionEndpoint.GetBySystemName(Region));
        }

        public async Task<Dictionary<string, string>> GetIdpSecret()
        {
            string cacheKey = "IdP_Secret";
            if (!_cache.TryGetValue(cacheKey, out Dictionary<string, string> secrets))
            {
                secrets = await FetchSecrets(idpSecretName);
                _cache.Set(cacheKey, secrets, _cacheExpiration);
            }
            return secrets;
        }
        public async Task<Dictionary<string, string>> GetRdsSecret()
        {
            string cacheKey = "DB_Secret";
            if (!_cache.TryGetValue(cacheKey, out Dictionary<string, string> secrets))
            {
                secrets = await FetchSecrets(rdsSecretName);
                _cache.Set(cacheKey, secrets, _cacheExpiration);
            }
            return secrets;
        }

        public async Task<string> GetDbConnectionString(Dictionary<string, string> secrets)
        {
            String dbConStr = String.Concat("Server = " ,secrets["connection"], "; Database=DEV_DB; TrustServerCertificate=True; User Id =", secrets["username"],"; Password=", secrets["password"]);
            return dbConStr;
        }
        private async Task<Dictionary<string, string>> FetchSecrets(string secretName)
        {
            GetSecretValueRequest request = new GetSecretValueRequest
            {
                SecretId = secretName,
                VersionStage = "AWSCURRENT",
            };
            GetSecretValueResponse response;
            try
            {
                response = await _secretsManager.GetSecretValueAsync(request);
            }
            catch (Exception e)
            {
                throw new Exception("Error fetching secrets from AWS Secrets Manager", e);
            }
            string secretString = response.SecretString;
            var secrets = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(secretString);

            return secrets;
        }
    }
}