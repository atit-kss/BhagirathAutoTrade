namespace BhagirathAutoTrade.Server.Models
{
    public class EquityRequestModel
    {
        public string Exchange { get; set; }
        public string Type { get; set; }
        public string Symbol { get; set; } = "";
        public string WorkingDate { get; set; } = "";
        public string ExpiryDate { get; set; } = "";
        public decimal Close { get; set; }
        public string Instrument { get; set; } = "";
        public string OptionType { get; set; } = "";
        public string StrickPrice { get; set; } = "";
    }
}
