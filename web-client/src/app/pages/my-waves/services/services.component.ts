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

  constructor(private cardService: CardService,
              private router: Router) { }

  ngOnInit() {
    this.selectedService = this.defaultService;
    this.LoadCards(this.selectedService);
  }

  private OnServiceClicked(serviceType) {
    this.LoadCards(serviceType);
  }

  private LoadCards(serviceType) {
    this.cardService.getCards(serviceType)
        .subscribe((card) => {
          this.cards = card;
        });
  }

  private OnNextStep(card) {
    // Todo: check if connected and redirect
    this.router.navigate(['pages/myWaves/addAction']).then();
  }

}
