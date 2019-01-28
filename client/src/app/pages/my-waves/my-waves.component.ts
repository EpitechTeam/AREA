import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-my-waves',
  templateUrl: './my-waves.component.html',
  styleUrls: ['./my-waves.component.css']
})
export class MyWavesComponent implements OnInit {
  constructor(private router: Router) { }

  cards = [];

  ngOnInit() {
  }

  onAddCard() {
    this.router.navigate(['pages/myWaves/addTrigger']).then();
  }
}
