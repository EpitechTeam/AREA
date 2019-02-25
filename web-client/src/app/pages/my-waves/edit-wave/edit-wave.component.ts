import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Card, CardService} from '../CardService/card.service';

@Component({
    selector: 'app-edit-wave',
    templateUrl: './edit-wave.component.html',
    styleUrls: ['./edit-wave.component.css']
})
export class EditWaveComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private router: Router,
                private cardService: CardService) {
    }

    public Card = new Card();
    public cardEnabled: boolean;

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.Card.enabled = params.enabled;
            this.Card.title = params.title;
            this.Card.description = params.description;
            this.Card.type = params.type;
            this.Card.class = params.class;
            this.Card.id = params.id;
            this.Card.enableEndpoint = params.enableEndpoint;
            this.Card.disableEndpoint = params.disableEndpoint;
            this.cardEnabled = this.Card.enabled;
        });
    }

    private async onEnable() {
        this.cardEnabled = !this.cardEnabled;
        if (this.cardEnabled === true) {
            await this.cardService.enableCard(this.Card);
        } else {
            await this.cardService.disableCard(this.Card);
            this.router.navigate(['pages/myWaves']).then();
        }
    }
}
