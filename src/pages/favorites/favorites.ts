import { Component } from '@angular/core';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes.service';
import { SettingsService } from '../../services/settings.service';
import { ModalController } from 'ionic-angular';
import { QuotePage } from '../quote/quote';
// import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[] = [];

  constructor(private quotesService: QuotesService,
    private modalCtrl: ModalController,
    private settingsService: SettingsService) {

  }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
        if(remove){
          this.quotesService.removeQuoteToFavorite(quote);
          const position = this.quotes.findIndex((quoteEl: Quote ) => {
            return quoteEl.id == quote.id;
          });
          this.quotes.splice(position, 1);
        }
    });
  }

  onRemoveFromFavorite(quote: Quote) {
    this.quotesService.removeQuoteToFavorite(quote);
    const position = this.quotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(position, 1);
  }

  // onOpenMenu() {
  //   this.menuController.open();
  // }

  // getBackground() {
  //   return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  // }

  isAltBackground() {
    return this.settingsService.isAltBackground();
  }
}
