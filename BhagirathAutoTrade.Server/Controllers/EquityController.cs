using BhagirathAutoTrade.Server.Models;
using BhagirathAutoTrade.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BhagirathAutoTrade.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquityController : Controller
    {
        private readonly IEquityService _equityService;

        public EquityController(IEquityService equityService)
        {
            _equityService = equityService;
        }

        [HttpPost("AutoCompleteCompanyForEquity")]
        public async Task<ActionResult<IEnumerable<string>>> AutoCompleteCompanyForEquity([FromBody] EquityRequestModel model)
        {
            var data = await _equityService.AutoCompleteCompanyForEquityAsync(model.Exchange,model.Type,model.Instrument,model.OptionType);
            return Ok(data);
        }

        [HttpPost("GetCalculateDataForEQ")]
        public async Task<ActionResult<EquityDataModel>> GetCalculateDataForEQ([FromBody] EquityRequestModel model)
        {
            var data =await _equityService.GetCalculateDataForEQAsync(model);
            return Ok(data);
        }

        [HttpPost("GetOpenData")]
        public async  Task<ActionResult<string>> GetOpenData([FromBody] EquityRequestModel model)
        {
            var data =await _equityService.GetOpenDataAsync(model.WorkingDate,model.ExpiryDate,model.Exchange,model.Instrument,model.OptionType,model.Type,model.StrickPrice,model.Symbol);
            return Ok(data);
        }
    }
}
