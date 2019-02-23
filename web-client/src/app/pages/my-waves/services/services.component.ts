import {Component, Input, OnInit} from '@angular/core';
import {Card, CardService} from '../CardService/card.service';
import {Router} from '@angular/router';

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
        name: 'Outlook',
        class: 'outlook'
    }, {
        name: 'OneDrive',
        class: 'oneDrive'
    }, {
        name: 'Calendar',
        class: 'calendar'
    }];

    constructor(private cardService: CardService,
                private router: Router) {
    }

    ngOnInit() {
        this.selectedService = this.defaultService;
        this.LoadCards(this.selectedService);
    }

    private OnServiceClicked(serviceType) {
        this.LoadCards(serviceType);
    }

    private LoadCards(serviceType) {
        const cards = this.cardService.getCards(serviceType);
        if (cards) {
            cards.subscribe((items) => {
                this.cards = items.filter(card => card.enabled === false);
            });
        } else {
            this.cards = null;
        }
    }

    private OnNextStep(card) {
        // Todo: check if connected and redirect
        // this.router.navigate(['pages/myWaves/addAction']).then();
    }

    private filterText(services) {
        return (services.filter(item => item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1))
    }

}
