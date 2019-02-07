import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ConnectorService} from '../../connector.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private connector: ConnectorService) {
  }

  test = '';

  ngOnInit() {
    this.GetData();

  }

  private IsO365Connected() {
    return (this.connector.office365.IsConnected());
  }

  OnO365Login() {
    this.connector.office365.Login();
    return (false);
  }

  OnO365Logout() {
    this.connector.office365.Logout();
    return (false);
  }

  GetData() {
    if (this.connector.office365.IsConnected()) {
      let res;
      this.connector.office365.GetData().subscribe(response => {
        res = response;
        this.test = res['givenName'] + ' ' + res['surname'];
      });
    }
  }
}
