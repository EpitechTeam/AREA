import {Component, Input, OnInit} from '@angular/core';
import {Card, CardService} from '../CardService/card.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../../../user.service';
import {ConnectorService} from '../../../connector.service';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

    @Input() Title: string;
    selectedService: string;
    defaultService = 'facebook';
    cards: Array<Card> = [];
    stockCards: Array<Card> = [];
    searchText = '';
    Services = [{
        name: 'Facebook',
        class: 'facebook'
    }, {
        name: 'Twitter',
        class: 'twitter'
    }, {
        name: 'Weather',
        class: 'meteo'
    }];

    constructor(private cardService: CardService,
                private router: Router,
                private http: HttpClient,
                private userService: UserService,
                private connectorService: ConnectorService) {
    }

    async ngOnInit() {
        this.selectedService = this.defaultService;
        await this.LoadCards();
        this.loopRequest();
    }

    loopRequest() {
        setTimeout(async () => {
            await this.LoadCards();
            this.loopRequest();
        }, 10000);
    }

    private OnAllServiceClicked() {
        this.selectedService = 'all';
        this.cards = this.stockCards;
    }

    private async OnServiceClicked(serviceType) {
        this.searchText = '';
        this.selectedService = serviceType;
        this.cards = this.stockCards.filter((item) => item.type === this.selectedService);
    }

    private async LoadCards(serviceType = null) {
        if (serviceType != null) {
            this.cards = await this.cardService.getDisabledCardsFromType(serviceType);
        } else {
            this.cards = await this.cardService.getDisabledCards();
            this.stockCards = await this.cardService.getDisabledCards();
        }
    }

    private async onEnable(card) {
        if (this.connectorService.getConnector(card.type).isConnected() === false) {
            this.router.navigate(['pages/manage/' + card.type]).then();
        } else {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': this.userService.getUser().token
                })
            };
            const url = this.userService.baseUrl + card.type + '/' + card.enableEndpoint;

            await this.http.put(url, null, httpOptions).toPromise();
        }
        this.stockCards.splice(this.cards.indexOf(card), 1);
        this.cards.splice(this.cards.indexOf(card), 1);
    }

    private filterCards(cards) {
        if (this.searchText.length > 0) {
            return (this.stockCards.filter((item) => item.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1));
        }
        return (this.cards.filter((item) => {
            if (this.selectedService !== 'all') {
                return (item.type === this.selectedService);
            }
            return true;
        }));
    }

}
