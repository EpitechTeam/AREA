import {Component, Input, OnInit} from '@angular/core';
import {Card, CardService} from '../CardService/card.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../../../user.service';

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
    searchText = '';
    Services = [{
        name: 'Facebook',
        class: 'facebook'
    }, {
        name: 'Twitter',
        class: 'twitter'
    }];

    constructor(private cardService: CardService,
                private router: Router,
                private http: HttpClient,
                private userService: UserService) {
    }

    async ngOnInit() {
        this.selectedService = this.defaultService;
        await this.LoadCards(this.selectedService);
    }

    private async OnServiceClicked(serviceType) {
        await this.LoadCards(serviceType);
    }

    private async LoadCards(serviceType) {
        this.cards = await this.cardService.getDisabledCardsFromType(serviceType);
    }

    private async onEnable(card) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const url = this.userService.baseUrl + card.type + '/' + card.enableEndpoint;

        await this.http.put(url, null, httpOptions).toPromise();
        this.cards.splice(this.cards.indexOf(card), 1);
    }

    private filterText(services) {
        return (services.filter(item => item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1))
    }

}
