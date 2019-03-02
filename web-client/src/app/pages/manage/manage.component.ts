import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ConnectorService} from '../../connector.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

    constructor(private http: HttpClient,
                private route: ActivatedRoute,
                private connector: ConnectorService,
                private titleService: Title) {
    }

    intraToken = '';
    loading = false;

    Connectors = this.connector.Connectors;

    async ngOnInit() {
        this.titleService.setTitle('Sonar - Manage');
        await this.GetData();

        // Only to check Twitter's login
        this.route.queryParams.subscribe(async params => {
            if (params.oauth_token && params.oauth_verifier) {
                // @ts-ignore
                this.connector.getConnector('twitter').processLogin(params.oauth_token, params.oauth_verifier);
            }
        });
    }

    async GetData() {
        for (const connector of this.Connectors) {
            console.log(connector.name);
            await connector.getConnected();
            // if (connector.isConnected() === true) {
            //     await connector.getData();
            // }
        }
    }

    FilterConnectors(filter: boolean) {
        return this.Connectors.filter((connector) => connector.isConnected() === filter);
    }

    OnCloseEpitechModal() {
        // @ts-ignore
        this.connector.getConnector('epitech').showModal = false;
    }

    OnConnectEpitechModal() {
        // @ts-ignore
        this.connector.getConnector('epitech').processLogin(this.intraToken);
    }
}
