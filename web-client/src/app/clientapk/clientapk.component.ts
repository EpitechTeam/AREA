import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-clientapk',
    templateUrl: './clientapk.component.html',
    styleUrls: ['./clientapk.component.css']
})
export class ClientapkComponent implements OnInit {

    constructor(private http: HttpClient,
                private router: Router) {
    }

    async ngOnInit() {
        // const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        //
        // a.href = '/Users/davidzakrzewski/Desktop/EzTeam/AREA/web-client/src/assets/img/lemonde-logo.png';
        // a.download = '';
        // document.body.appendChild(a);
        // a.click();

    }

}
