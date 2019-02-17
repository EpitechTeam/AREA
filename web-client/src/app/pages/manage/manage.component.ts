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

  Connectors = this.connector.Connectors;

  ngOnInit() {
    this.GetData();
  }

  GetData() {
    this.Connectors.forEach((connector) => {
      // if (connector.isConnected()) {
        connector.getData();
      // }
    });
  }

  FilterConnectors(filter: boolean) {
    return this.Connectors.filter((connector) => connector.isConnected() === filter);
  }
}
