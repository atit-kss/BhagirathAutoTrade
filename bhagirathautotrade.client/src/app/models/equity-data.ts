export interface EquityData {
  Id: number;
  Exchange: string;
  Type: string;
  Instrument: string;
  OptionType: string;
  Symbole: string;
  WorkingDate: string | null;
  ExpiryDate: string | null;
  StrikePrice: string;
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
  SS: string;
  RS: string;
  SST: string;
  RST: string;
  HS: string;
  HR: string;
}
