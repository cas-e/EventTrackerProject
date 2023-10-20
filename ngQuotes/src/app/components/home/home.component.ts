import { QuoteService } from './../../services/quote.service';
import { Component } from '@angular/core';
import { Quote } from 'src/app/models/quote';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  quotes : Quote[] = [];

  selected : Quote | null = null;

  constructor(
    private quoteService : QuoteService
  )  {}

  ngOnInit() : void {
    // TODO

    this.loadQuotes();
  }

  // and for reloads
  loadQuotes() {
    this.quoteService.index().subscribe({
      next : (quotes) => {
        this.quotes = quotes;
      },
      error : (err) => console.log("load error " + err)
    })
  }
}
