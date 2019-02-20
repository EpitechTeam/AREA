import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ConnectorService} from '../../connector.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs';

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


    async ngOnInit() {
        await this.GetData();
    }

    async GetData() {
        for (const connector of this.Connectors) {
            await connector.getConnected();
            if (connector.isConnected() === true) {
                connector.getData();
            }
        }

    }

    FilterConnectors(filter: boolean) {
        return this.Connectors.filter((connector) => connector.isConnected() === filter);
    }
}
