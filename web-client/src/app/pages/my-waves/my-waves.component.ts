import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Route, Router} from '@angular/router';
import {CardService} from './CardService/card.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-my-waves',
    templateUrl: './my-waves.component.html',
    styleUrls: ['./my-waves.component.css']
})
export class MyWavesComponent implements OnInit {
    constructor(private router: Router,
                private cardService: CardService,
                private titleService: Title) {
    }

    cards = [];

    async ngOnInit() {
        this.titleService.setTitle('Sonar - My Waves');
        this.cards = await this.cardService.getEnabledCards(true);
    }

    onAddCard() {
        this.router.navigate(['pages/myWaves/addWave']).then();
    }

    onEditCard(card) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                'id' : card.id,
                'class' : card.class,
                'type' : card.type,
                'enabled' : card.enabled,
                'description' : card.description,
                'enableEndpoint' : card.enableEndpoint,
                'disableEndpoint' : card.disableEndpoint,
                'title' : card.title
            }
        };
        this.router.navigate(['pages/myWaves/editWave'], navigationExtras).then();
    }
}
