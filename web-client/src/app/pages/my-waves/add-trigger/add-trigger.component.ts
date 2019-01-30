import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ServicesComponent} from '../services/services.component';

@Component({
  selector: 'app-add-trigger',
  templateUrl: './add-trigger.component.html',
  styleUrls: ['./add-trigger.component.css'],
  viewProviders: [ServicesComponent]
})
export class AddTriggerComponent implements OnInit {

  Title = 'Choose a Trigger';

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {}

  onGoBack() {
    this.location.back();
  }

}
