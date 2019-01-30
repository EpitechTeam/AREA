import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {serialize} from '@angular/compiler/src/i18n/serializers/xml_helper';

export class Card {
  id: number;
  type: string;
  title: string;
  description: string;
  class: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor() { }

  FACEBOOKCARDS: Observable<Card[]> = of([{
    id: 0,
    type: 'test',
    title: 'facebook',
    description: 'test',
    class: 'card-facebook'
  }]);

  TWITTERCARDS: Observable<Card[]> = of([{
    id: 0,
    type: 'test',
    title: 'twitter',
    description: 'twitter',
    class: 'card-twitter'
  }]);

  getCards(serviceType): Observable<Card[]> {
    if (serviceType === 'twitter') {
      return (this.TWITTERCARDS);
    }
    if (serviceType === 'facebook') {
      return (this.FACEBOOKCARDS);
    }
  }
}
