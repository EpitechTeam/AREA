import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {serialize} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../../../user.service';

export class Card {
    id: number;
    enabled: boolean;
    type: string;
    title: string;
    key: string;
    enableEndpoint: string;
    disableEndpoint: string;
    description: string;
    class: string;
}

@Injectable({
    providedIn: 'root'
})
export class CardService {
    constructor(private userService: UserService,
                private http: HttpClient) {
    }

    private services = [
        'facebook'
    ];

    FACEBOOKCARDS: Card[] = [{
        id: 0,
        type: 'facebook',
        enabled: false,
        title: 'Event to Twitter',
        key: 'eventToTwitter',
        enableEndpoint: 'addEventToTwitter',
        disableEndpoint: 'removeEventToTwitter',
        description: 'Tweet when you subscribe to an event',
        class: 'card-facebook'
    }, {
        id: 1,
        type: 'facebook',
        enabled: false,
        key: 'eventToCalendar',
        title: 'Event to Calendar',
        enableEndpoint: 'addEventToCalendar',
        disableEndpoint: 'removeEventToCalendar',
        description: 'Add an event to your calendar when you subscribe to an event',
        class: 'card-facebook'
    }, {
        id: 2,
        type: 'facebook',
        title: 'Event to Email',
        key: 'eventToEmail',
        enabled: false,
        enableEndpoint: 'addEventToEmail',
        disableEndpoint: 'removeEventToEmail',
        description: 'Send you and email when you subscribe to an event',
        class: 'card-facebook'
    }, {
        id: 3,
        type: 'facebook',
        title: 'Status to Email',
        enabled: false,
        key: 'statusToEmail',
        enableEndpoint: 'addStatusToEmail',
        disableEndpoint: 'removeStatusToEmail',
        description: 'Send you and email when you change your status',
        class: 'card-facebook'
    }, {
        id: 4,
        type: 'facebook',
        title: 'Profile picture to Email',
        enabled: false,
        key: 'photosToEmail',
        enableEndpoint: 'addPhotosToEmail',
        disableEndpoint: 'removePhotosToEmail',
        description: 'Send you and email when you change your profile picture',
        class: 'card-facebook'
    }, {
        id: 5,
        type: 'facebook',
        title: 'Location to Email',
        enabled: false,
        key: 'locationToEmail',
        enableEndpoint: 'addLocationToEmail',
        disableEndpoint: 'removeLocationToEmail',
        description: 'Send you and email when you change your location',
        class: 'card-facebook'
    }, {
        id: 6,
        type: 'facebook',
        title: 'Religion to Email',
        enabled: false,
        key: 'religionToEmail',
        enableEndpoint: 'addReligionToEmail',
        disableEndpoint: 'removeReligionToEmail',
        description: 'Send you and email when you change your religion',
        class: 'card-facebook'
    }, {
        id: 7,
        type: 'facebook',
        title: 'Hometown to Email',
        enabled: false,
        key: 'hometownToEmail',
        enableEndpoint: 'addHometownToEmail',
        disableEndpoint: 'removeHometownToEmail',
        description: 'Send you and email when you change your hometown',
        class: 'card-facebook'
    }, {
        id: 8,
        type: 'facebook',
        title: 'Friend to Email',
        enabled: false,
        key: 'friendsToEmail',
        enableEndpoint: 'addFriendsToEmail',
        disableEndpoint: 'removeFriendsToEmail',
        description: 'Send you and email when you add a friend',
        class: 'card-facebook'
    }, {
        id: 9,
        type: 'facebook',
        title: 'Work to Email',
        enabled: false,
        key: 'workToEmail',
        enableEndpoint: 'addWorkToEmail',
        disableEndpoint: 'removeWorkToEmail',
        description: 'Send you and email when you add a work',
        class: 'card-facebook'
    }, {
        id: 10,
        type: 'facebook',
        title: 'Education to Email',
        enabled: false,
        key: 'educationToEmail',
        enableEndpoint: 'addEducationToEmail',
        disableEndpoint: 'removeEducationToEmail',
        description: 'Send you and email when you add an education place',
        class: 'card-facebook'
    }];

    TWITTERCARDS: Card[] = [{
        id: 0,
        type: 'twitter',
        enabled: false,
        enableEndpoint: 'todo',
        disableEndpoint: 'todo',
        key: 'todo',
        title: 'twitter',
        description: 'twitter',
        class: 'card-twitter'
    }];

    ONEDRIVECARDS: Card[] = [{
        id: 0,
        type: 'oneDrive',
        enabled: false,
        title: 'One Drive title',
        key: 'todo',
        enableEndpoint: 'todo',
        disableEndpoint: 'todo',
        description: 'Description',
        class: 'card-oneDrive'
    }];

    CALENDARCARDS: Card[] = [{
        id: 0,
        type: 'calendar',
        enabled: false,
        title: 'Calendar Title',
        key: 'todo',
        enableEndpoint: 'todo',
        disableEndpoint: 'todo',
        description: 'Description',
        class: 'card-calendar'
    }];

    public async getDisabledCardsFromType(serviceType) {
        let cards: Card[] = [];
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const res = await this.http.get(this.userService.baseUrl + serviceType + '/myOption', httpOptions).toPromise();

        if (serviceType === 'twitter') {
            this.TWITTERCARDS.forEach(card => {
                if (res['data'][card.key] === false) {
                    cards.push(card);
                }
            });
        }
        if (serviceType === 'facebook') {
            this.FACEBOOKCARDS.forEach(card => {
                if (res['data'][card.key] === false) {
                    cards.push(card);
                }
            });
        }
        if (serviceType === 'oneDrive') {
            this.ONEDRIVECARDS.forEach(card => {
                if (res['data'][card.key] === false) {
                    cards.push(card);
                }
            });
        }
        if (serviceType === 'calendar') {
            this.CALENDARCARDS.forEach(card => {
                if (res['data'][card.key] === false) {
                    cards.push(card);
                }
            });
        }
        return (cards);
    }

    public async getEnabledCards(enabled: boolean) {
        let cards: Card[] = [];
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        let res = await this.http.get(this.userService.baseUrl + 'facebook/myOption', httpOptions).toPromise();
        this.FACEBOOKCARDS.forEach(card => {
            if (res['data'][card.key] === enabled) {
                card.enabled = enabled;
                cards.push(card);
            }
        });
        return (cards);
    }

    public async enableCard(card: Card) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const url = this.userService.baseUrl + card.type + '/' + card.enableEndpoint;
        await this.http.put(url, null, httpOptions).toPromise();
    }

    public async disableCard(card: Card) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const url = this.userService.baseUrl + card.type + '/' + card.disableEndpoint;
        await this.http.put(url, null, httpOptions).toPromise();
    }
}
