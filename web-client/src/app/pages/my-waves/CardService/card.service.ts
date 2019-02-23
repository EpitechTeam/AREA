import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {serialize} from '@angular/compiler/src/i18n/serializers/xml_helper';

export class Card {
    id: number;
    enabled: boolean;
    type: string;
    title: string;
    description: string;
    class: string;
}

@Injectable({
    providedIn: 'root'
})
export class CardService {
    constructor() {
    }

    FACEBOOKCARDS: Observable<Card[]> = of([{
        id: 0,
        type: 'facebook',
        enabled: false,
        title: 'Event to Twitter',
        description: 'Tweet when you subscribe to an event',
        class: 'card-facebook'
    }, {
        id: 1,
        type: 'facebook',
        enabled: false,
        title: 'Event to Calendar',
        description: 'Add an event to your calendar when you subscribe to an event',
        class: 'card-facebook'
    }, {
        id: 2,
        type: 'facebook',
        title: 'Event to Email',
        enabled: false,
        description: 'Send you and email when you subscribe to an event',
        class: 'card-facebook'
    }, {
        id: 3,
        type: 'facebook',
        title: 'Post to Email',
        enabled: false,
        description: 'Send you and email when you post',
        class: 'card-facebook'
    }]);

    TWITTERCARDS: Observable<Card[]> = of([{
        id: 0,
        type: 'twitter',
        enabled: false,
        title: 'twitter',
        description: 'twitter',
        class: 'card-twitter'
    }]);

    ONEDRIVECARDS: Observable<Card[]> = of([{
        id: 0,
        type: 'oneDrive',
        enabled: false,
        title: 'One Drive title',
        description: 'Description',
        class: 'card-oneDrive'
    }]);

    CALENDARCARDS: Observable<Card[]> = of([{
        id: 0,
        type: 'calendar',
        enabled: false,
        title: 'Calendar Title',
        description: 'Description',
        class: 'card-calendar'
    }]);

    getCards(serviceType): Observable<Card[]> {
        if (serviceType === 'twitter') {
            return (this.TWITTERCARDS);
        }
        if (serviceType === 'facebook') {
            return (this.FACEBOOKCARDS);
        }
        if (serviceType === 'oneDrive') {
            return (this.ONEDRIVECARDS);
        }
        if (serviceType === 'calendar') {
            return (this.CALENDARCARDS);
        }
        return (null);
    }
}
