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
    }, {
        id: 11,
        type: 'facebook',
        title: 'Photo to Twitter',
        enabled: false,
        key: 'photosToTwitter',
        enableEndpoint: 'addPhotosToTwitter',
        disableEndpoint: 'removePhotosToTwitter',
        description: 'Tweets your profile/cover picture',
        class: 'card-facebook'
    }, {
        id: 12,
        type: 'facebook',
        title: 'Photo to Twitter',
        enabled: false,
        key: 'statusToTwitter',
        enableEndpoint: 'addStatusToTwitter',
        disableEndpoint: 'removeStatusToTwitter',
        description: 'Tweets your Facebook posts',
        class: 'card-facebook'
    }];

    TWITTERCARDS: Card[] = [{
        id: 0,
        type: 'twitter',
        enabled: false,
        enableEndpoint: 'addTweetByMail',
        disableEndpoint: 'removeTweetByMail',
        key: 'tweetByMail',
        title: 'Tweet to Email',
        description: 'Each time you tweet, you receive a copy by email',
        class: 'card-twitter'
    }, {
        id: 1,
        type: 'twitter',
        enabled: false,
        enableEndpoint: 'addStartFollowByMail',
        disableEndpoint: 'removeStartFollowByMail',
        key: 'startFollowByMail',
        title: 'Following to Email',
        description: 'Each time you follow, you receive an email',
        class: 'card-twitter'
    }, {
        id: 2,
        type: 'twitter',
        enabled: false,
        enableEndpoint: 'addGetFollowByMail',
        disableEndpoint: 'removeGetFollowByMail',
        key: 'getFollowByMail',
        title: 'Followed to Email',
        description: 'Each time you are followed, you receive an email',
        class: 'card-twitter'
    }, {
        id: 3,
        type: 'twitter',
        enabled: false,
        enableEndpoint: 'addGetUnfollowByMail',
        disableEndpoint: 'removeGetUnfollowByMail',
        key: 'getUnfollowByMail',
        title: 'Unfollowing to Email',
        description: 'Each time you unfollow, you receive an email',
        class: 'card-twitter'
    }, {
        id: 4,
        type: 'twitter',
        enabled: false,
        enableEndpoint: 'addStartFollowSendDirectMessage',
        disableEndpoint: 'removeStartFollowSendDirectMessage',
        key: 'startFollowSendDirectMessage',
        title: 'Followed to Direct Message',
        description: 'Each time you are followed, you send a direct message',
        class: 'card-twitter'
    }];

    WEATHERCARDS: Card[] = [{
        id: 0,
        type: 'meteo',
        enabled: false,
        enableEndpoint: 'addMeteoToEmail',
        disableEndpoint: 'removeFromEmail',
        key: 'toEmail',
        title: 'Weather to Email',
        description: 'Send you the weather by email =)',
        class: 'card-meteo'
    }, {
        id: 1,
        type: 'meteo',
        enabled: false,
        enableEndpoint: 'addMeteoToCalendar',
        disableEndpoint: 'removeFromCalendar',
        key: 'toCalendar',
        title: 'Weather to Calendar',
        description: 'Set the weather to Calendar',
        class: 'card-meteo'
    }, {
        id: 2,
        type: 'meteo',
        enabled: false,
        enableEndpoint: 'addMeteoToTwitter',
        disableEndpoint: 'removeFromTwitter',
        key: 'toTwitter',
        title: 'Weather to Twitter',
        description: 'Tweets the weather',
        class: 'card-meteo'
    }];

    public async getDisabledCardsFromType(serviceType) {
        // @ts-ignore
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

        if (serviceType === 'meteo') {
            this.WEATHERCARDS.forEach(card => {
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
        res = await this.http.get(this.userService.baseUrl + 'twitter/myOption', httpOptions).toPromise();
        this.TWITTERCARDS.forEach(card => {
            if (res['data'][card.key] === enabled) {
                card.enabled = enabled;
                cards.push(card);
            }
        });
        res = await this.http.get(this.userService.baseUrl + 'meteo/myOption', httpOptions).toPromise();
        this.WEATHERCARDS.forEach(card => {
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
