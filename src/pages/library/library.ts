import { Component, OnInit } from '@angular/core';
import { Quote } from '../../data/quote.interface';
import { QuotesPage } from '../quotes/quotes';
import quotes from '../../data/quotes';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage implements OnInit {
  quotesPage = QuotesPage;
  collectionQuotes: {
    category: string,
    quotes: Quote[],
    icon: string
  }[];

  ngOnInit(){
    this.collectionQuotes = quotes;
  }

}
