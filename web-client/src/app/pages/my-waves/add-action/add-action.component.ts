import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent implements OnInit {

  Title = 'Choose an Action';

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
  }

  onGoBack() {
    this.location.back();
  }
}
