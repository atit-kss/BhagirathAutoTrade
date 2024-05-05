using BhagirathAutoTrade.Server.Models;
using Newtonsoft.Json;
using System.Text.Json;
using System.Net.Http.Headers;
using JsonSerializer = System.Text.Json.JsonSerializer;
using BhagirathAutoTrade.Server.Services.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BhagirathAutoTrade.Server.Services
{
    public class EquityService : IEquityService
    {
        private readonly HttpClient _httpClient;

        public EquityService()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("http://api.bhagirathfincare.in/api/Equity/");
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<IEnumerable<string>> AutoCompleteCompanyForEquityAsync(string exchange, string type, string instrument, string optionType)
        {
            try
            {
                var query = $"AutoCompleteCompanyForEquity?exchange={exchange}&type={type}&instrument={instrument}&optionType={optionType}";

                // Sample data for POST request
                var response = await _httpClient.PostAsync(query, null);

                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();

                var result = JsonSerializer.Deserialize<AutocompleteResponse>(content);

                return result.Data;
            }
            catch (Exception ex)
            {
                // Handle exception
                throw;
            }
        }

        public async Task<string> GetOpenDataAsync(string workingDate, string expiryDate, string exchange, string instrument, string optionType, string type, string strickPrice, string symbol)
        {
            try
            {
                var url = $"GetOpenData?workingDate={workingDate}&expiryDate={expiryDate}&exchange={exchange}&instrument={instrument}&optionType={optionType}&type={type}&strickPrice={strickPrice}&symbole={symbol}";

                var response = await _httpClient.PostAsync(url, null);
                response.EnsureSuccessStatusCode();

                var responseData = await response.Content.ReadAsStringAsync();

                return responseData;
            }
            catch (Exception ex)
            {
                // Handle exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                return null;
            }
        }

        public async Task<EquityResponseModel> GetCalculateDataForEQAsync(EquityRequestModel request)
        {
            try
            {
                var jsonRequest = JsonConvert.SerializeObject(request);
                var content = new StringContent(jsonRequest, System.Text.Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync("getCalculateDataForEQ", content);
                response.EnsureSuccessStatusCode();

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var responseData = JsonConvert.DeserializeObject<EquityResponseModel>(jsonResponse);

                return responseData;
            }
            catch (Exception ex)
            {
                // Handle exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                return null;
            }
        }
    }
}
