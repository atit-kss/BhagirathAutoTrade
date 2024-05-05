export interface EquityData {
  Id: number;
  exchange: string;
  type: string;
  instrument: string;
  optionType: string;
  Symbol: string;
  StartDate: string | null;
  ExpiryDate: string | null;
  StrikePrice: string;
  OptionType: string;
  Open: string;
  High: string;
  Low: string;
  Cmp: string;
  Close: string;
  FileType: number;
  UploadDateTime: string;
  FileNo: number;
  Average: string;
  TotalTradeValue: string;
  MST: string;
  MSTS: string;
}
