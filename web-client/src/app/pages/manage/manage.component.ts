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
    city = '';
    insee = '';
    now = new Date();
    loading = false;

    days = ['Sun', 'Mon', 'Tues', 'Wedn', 'Thur', 'Frid', 'Satu'];


    Connectors = this.connector.Connectors;

    async ngOnInit() {
        this.titleService.setTitle('Sonar - Manage');
        await this.GetData();

        this.route.params.subscribe( params => {
            if (params.type) {
                this.connector.getConnector(params.type).login();
            }
        });

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
            await connector.getConnected();
            if (connector.isConnected() === true) {
                await connector.getData();
            }
        }
    }

    AnnexCards(connector) {
        if (connector === 'meteo' || connector === 'lemonde' || connector === 'nasa') {
            return false;
        }
        return true;
    }

    FilterConnectors(filter: boolean) {
        return this.Connectors.filter((connector) => connector.isConnected() === filter);
    }

    OnCloseEpitechModal() {
        // @ts-ignore
        this.connector.getConnector('intra').showModal = false;
    }

    OnConnectEpitechModal() {
        // @ts-ignore
        this.connector.getConnector('intra').processLogin(this.intraToken);
    }

    OnCloseWeatherModal() {
        // @ts-ignore
        this.connector.getConnector('meteo').showModal = false;
    }

    OnConnectWeatherModal() {
        // @ts-ignore
        this.connector.getConnector('meteo').processLogin(this.city, this.insee);
    }

    SetDayOfWeek(day) {
        const date = new Date(day.datetime);
        return this.days[date.getDay()];
    }
}
