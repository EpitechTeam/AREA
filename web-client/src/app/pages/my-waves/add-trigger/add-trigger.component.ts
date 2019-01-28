import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-trigger',
  templateUrl: './add-trigger.component.html',
  styleUrls: ['./add-trigger.component.css']
})
export class AddTriggerComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  onGoBack() {
    this.location.back();
  }

}
