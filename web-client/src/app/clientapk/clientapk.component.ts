import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-clientapk',
    templateUrl: './clientapk.component.html',
    styleUrls: ['./clientapk.component.css']
})
export class ClientapkComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    async ngOnInit() {
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = 'test.png';
        a.download = 'test.png';
        document.body.appendChild(a);
        a.click();
    }

}
