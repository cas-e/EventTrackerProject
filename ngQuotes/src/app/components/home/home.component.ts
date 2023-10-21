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

  editDraft : Quote | null = null;

  createDraft : Quote | null = null;

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
        this.quotes = quotes.reverse();
      },
      error : (err) => console.log("load error " + err)
    })
  }

  confirmCreate(quote : Quote) {


    this.quoteService.create(quote).subscribe({
      next : (quote) => {
        this.createDraft = null;
        this.loadQuotes();
      },
      error : error => console.log("quote creation error " + error)
    })

  }

  showCreateQuote() {
    this.createDraft = new Quote();
  }

  confirmEdit(quote : Quote | null) {
    console.log(quote)
    if (!quote) {
      console.log("logic error in confirm quote")
      return;
    }

    this.quoteService.udpate(quote).subscribe({
      next: (quote) => {
        this.editDraft = null;
        this.loadQuotes();
      },
      error: err => console.log("confirm edit err" + err)
    })

  }

  destroy(quote : Quote) {
    this.quoteService.delete(quote).subscribe({
      next: (quote) => {
        this.loadQuotes();
      },
      error: err => console.log("delete quote err " + err)
    })
  }

}
