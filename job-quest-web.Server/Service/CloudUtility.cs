﻿using Amazon;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Microsoft.Extensions.Caching.Memory;
namespace job_quest_web.Server.Service
{
    public class CloudUtility
    {
        private readonly IMemoryCache _cache;
        private readonly IAmazonSecretsManager _secretsManager;
        private static readonly TimeSpan _cacheExpiration = TimeSpan.FromDays(1);
        private const string idpSecret = "dev/JQ/IdP_Secret";
        private const string dbConnectionSecret = "dev/JQ/DB_Secret";
        private const string Region = "ap-south-1";

        public CloudUtility(IMemoryCache cache)
        {
            _cache = cache;
            _secretsManager = new AmazonSecretsManagerClient(RegionEndpoint.GetBySystemName(Region));
        }

        public async Task<Dictionary<string, string>> GetGoogleIdpSecret()
        {

            string cacheKey = "IdP_Secret";
            if (!_cache.TryGetValue(cacheKey, out Dictionary<string, string> secrets))
            {
                secrets = await FetchSecrets();
                _cache.Set(cacheKey, secrets, _cacheExpiration);
            }
            return secrets;
        }
        public async Task<Dictionary<string, string>> GetGoogleIdpSecret()
        {

            string cacheKey = "IdP_Secret";
            if (!_cache.TryGetValue(cacheKey, out Dictionary<string, string> secrets))
            {
                secrets = await FetchSecrets();
                _cache.Set(cacheKey, secrets, _cacheExpiration);
            }
            return secrets;
        }

        private async Task<Dictionary<string, string>> FetchSecrets()
        {
            GetSecretValueRequest request = new GetSecretValueRequest
            {
                SecretId = idpSecret,
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