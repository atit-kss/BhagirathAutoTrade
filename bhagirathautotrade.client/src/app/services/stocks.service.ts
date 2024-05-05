import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { APIUrlConstants } from '../models/apiurl-constants';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private baseUrl = `${APIUrlConstants.BaseUrl}/Equity`;

  constructor(private http: HttpClient) { }

  autoCompleteCompanyForEquity(exchange: string, type: string, instrument: string, optionType: string): Observable<string[]> {
    const body = { exchange, type, instrument, optionType };
    return this.http.post<string[]>(`${this.baseUrl}/AutoCompleteCompanyForEquity`, body);
  }

  getCalculateDataForEQ(workingDate: string,
    expiryDate: string,
    exchange: string,
    instrument: string,
    optionType: string,
    type: string,
    strikePrice: string,
    symbol: string): Observable<any> {
    const body = { symbol, workingDate, expiryDate, close, exchange, instrument, optionType, type, strikePrice };
    return this.http.post<any>(`${this.baseUrl}/getCalculateDataForEQ`, body);
  }

  getStrikePrice(exchange: string, type: string, symbol: string, expireDate: string): Observable<any> {
    const url = `${APIUrlConstants.BhagirathApiUrl}/Equity/GetStrikePrice`;
    const params = {
      exchange,
      type,
      symbol,
      expireDate
    };

    return this.http.post<any>(url, params).pipe(map(response => {
      if (response.Success == 1) {
        return response.Data;
      }
    }));
  }

  getexpiredate(companyName: string, optiontype: string) {
    var requestModel = {
      Symbole: companyName,
      OptionType: optiontype
    }
    return this.http.post<any>(`${APIUrlConstants.BhagirathApiUrl}/Equity/AutoCompleteexpiry`, requestModel)
      .pipe(map(response => {
        if (response.Success == 1) {
          return response.Data;
        }
      }));
  }

  //getOpenData(workingDate: string, expiryDate: string, exchange: string, instrument: string, optionType: string, type: string, symbol: string): Observable<string> {
  //  const body = { workingDate, expiryDate, exchange, instrument, optionType, type, symbol };
  //  return this.http.post<string>(`${this.baseUrl}/GetOpenData`, body);
  //}

  //private baseUrl = '/api/Equity';
  //private getCalculateDataForEQApi = this.baseUrl+'/getCalculateDataForEQ';
  //private autoCompleteCompanyForEquityApi = this.baseUrl + '/AutoCompleteCompanyForEquity';
  //private getOpenDataApi = this.baseUrl + '/GetOpenData';
   
  //constructor(private http: HttpClient) { }

  //autoCompleteCompanyForEquity(exchange: string, type: string, instrument: string, optionType: string): Observable<string[]> {
  //  const body = {
  //    exchange,
  //    type,
  //    instrument,
  //    optionType
  //  };

  //  return this.http.post<any>(this.autoCompleteCompanyForEquityApi, body).pipe(
  //    map((response: { Data: string[]; }) => response.Data as string[])
  //  );
  //}

  //getCalculateDataForEQ(
    //workingDate: string,
    //expiryDate: string,
    //exchange: string,
    //instrument: string,
    //optionType: string,
    //type: string,
    //strikePrice: string,
    //symbol: string
  //): Observable<EquityData> {
  //  const body = {
  //    workingDate,
  //    expiryDate,
  //    exchange,
  //    instrument,
  //    optionType,
  //    type,
  //    strikePrice,
  //    symbol
  //  };

  //  return this.http.post<EquityData>(this.getCalculateDataForEQApi, body);
  //}

  getOpenData(workingDate: string, expiryDate: string, exchange: string, instrument: string, optionType: string, type: string, strickPrice: string, symbol: string): Observable<string> {
    const body = {
      workingDate,
      expiryDate,
      exchange,
      instrument,
      optionType,
      type,
      strickPrice,
      symbol
    };

    return this.http.post<string>(`${this.baseUrl}/GetOpenData`, body);

    //return this.http.post<any>(`${this.baseUrl}/GetOpenData`, body).pipe(
    //  map(response => response.Data as string)
    //);
  }
}
