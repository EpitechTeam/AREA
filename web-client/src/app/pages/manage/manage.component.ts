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

    TwitterOauth_token = '';
    TwitterOauth_verifier = '';


    async ngOnInit() {
        await this.GetData();

        // Only to check Twitter's login
        this.route.queryParams.subscribe(async params => {
            if (params.oauth_token && params.oauth_verifier) {
                this.connector.getConnector('twitter').processLogin(params.oauth_token, params.oauth_verifier);
                // this.TwitterOauth_token = params.oauth_token;
                // this.TwitterOauth_verifier = params.oauth_verifier;
            }
        });
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
