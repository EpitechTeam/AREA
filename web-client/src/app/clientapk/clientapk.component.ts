import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-clientapk',
  templateUrl: './clientapk.component.html',
  styleUrls: ['./clientapk.component.css']
})
export class ClientapkComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
