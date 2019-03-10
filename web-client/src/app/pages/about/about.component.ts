import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'brace/index';
import 'brace/mode/json.js';
declare var ace: any;


@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    about = {};
    constructor(private userService: UserService,
                private http: HttpClient) {
    }

    async ngOnInit() {
        await this.GetData();
    }

    private async GetData() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        let res = await this.http.get(this.userService.baseUrl + 'about.json', httpOptions).toPromise();
        // @ts-ignore
        this.about = JSON.stringify(res.body, null, 2);
    }

}
