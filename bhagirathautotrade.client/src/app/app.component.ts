import { Component, OnInit } from '@angular/core';
import { EquityData } from './models/equity-data';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { StocksService } from './services/stocks.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public equitydata: EquityData = {
    Id: 0,
    StartDate: null,
    exchange: '',
    type: '',
    instrument: '',
    optionType: '',
    Symbol: '',
    ExpiryDate: null,
    StrikePrice: '',
    OptionType: '',
    Open: '',
    High: '',
    Low: '',
    Cmp: '',
    Close: '',
    FileType: 0,
    UploadDateTime: '',
    FileNo: 0,
    Average: '',
    TotalTradeValue: '',
    MST: '',
    MSTS: ''
  };
  public datePipe: DatePipe = new DatePipe('en-US');
  public optidxstxoption: boolean = false;
  public derivativeoption: boolean = false;
  //public optidxstxoption: boolean = true;
  //public optidxstxoption: boolean = true;
  public expiry: string[] = [];
  public currentDate: string = '';

  searchControl = new FormControl();
  options: string[] = [];
  filteredOptions: string[] = [];
  expiryDates: string[]=[];
  constructor(private stocksService: StocksService) {
    this.setCurrentDate();
  }

  ngOnInit() {
    //$('#autoCompleteTextbox').typeahead({
    //  source: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] // Data source for auto-completion
    //});

    this.searchControl.disable();
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      )
      .subscribe(options => this.filteredOptions = options);
  }

  onExchangeChange() {
    this.equitydata.type = '';
    this.equitydata.instrument = '';
    this.equitydata.optionType = '';
    this.options = [];
    this.enableSymbolSearch();
  }

  enableSymbolSearch() {
    if (this.equitydata.exchange && this.equitydata.type) {
      if (['DERIVATIVE'].includes(this.equitydata.type)) {
        if (this.equitydata.instrument && this.equitydata.optionType) {
          this.searchControl.enable();
        } else {
          this.searchControl.disable();
        }
      } else {
        this.searchControl.enable();
      }
    } else {
      this.searchControl.disable();
    }
  }

  fetchOptions(): void {
    if (!this.options || this.options != null || this.options == undefined) {
      // Check if all parameters are available
      if (this.equitydata.exchange && this.equitydata.type) {
        if (['DERIVATIVE'].includes(this.equitydata.type)) {
          if (this.equitydata.instrument && this.equitydata.optionType) {
            // Make API call to fetch options
            this.stocksService.autoCompleteCompanyForEquity(this.equitydata.exchange, this.equitydata.type, this.equitydata.instrument, this.equitydata.optionType)
              .subscribe(options => {
                this.options = options;
              });
          }
        } else {
          // Make API call to fetch options
          this.stocksService.autoCompleteCompanyForEquity(this.equitydata.exchange, this.equitydata.type, this.equitydata.instrument, this.equitydata.optionType)
            .subscribe(options => {
              this.options = options;
            });
        }

      } else {
        // If any parameter is missing, clear options and disable autocomplete control
        this.options = [];
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFn(value: string): string {
    return value ? value : '';
  }

  setCurrentDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
    const day = today.getDate().toString().padStart(2, '0'); // Adding leading zero if needed
    this.currentDate = `${year}-${month}-${day}`;
  }

  onTypeOptionUpdate(): void {
    // Check if the selected instrument is FUTIDX, FUTIVX, or FUTSTK
    if (['DERIVATIVE'].includes(this.equitydata.type)) {
      this.derivativeoption = true; // Set optidxstxoption to false
    } else {
      this.derivativeoption = false; // Set optidxstxoption to true for other options
    }
    this.equitydata.instrument = '';
    this.equitydata.optionType = '';
    this.options = [];
    this.equitydata.Symbol = '';
    this.enableSymbolSearch();
  }

  onInstrumentOptionUpdate(): void {
    // Check if the selected instrument is FUTIDX, FUTIVX, or FUTSTK
    if (['OPTIDX', 'OPTSTK'].includes(this.equitydata.instrument)) {
      this.optidxstxoption = true; // Set optidxstxoption to false
    } else {
      this.optidxstxoption = false; // Set optidxstxoption to true for other options
    }
    this.equitydata.optionType = '';
    this.options = [];
    this.enableSymbolSearch();
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedSymbol = event.option.value;
    // Call your getexpiredate() method here with the selected symbol
    this.stocksService.getexpiredate(selectedSymbol, this.equitydata.optionType).subscribe((result: string[]) => {
      this.expiryDates = [];
      this.expiryDates = result;
      for (var i = 0; i < this.expiryDates.length; i++) {
        var selectedexpire = this.datePipe.transform(this.expiryDates[i], 'MM/dd/yyyy');
        var expireDate = null;
        if (selectedexpire)
          expireDate = new Date(selectedexpire);

        var todayNewDate = new Date();

        if (expireDate && expireDate >= todayNewDate) {
          this.equitydata.ExpiryDate = selectedexpire;
          break;
        }
      }
    });
    
  }

  title = 'Bhagirath Auto Trade App';
}
