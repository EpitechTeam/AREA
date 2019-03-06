import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {ConnectorService} from './connector.service';
import {last} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private router: Router,
                private http: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    baseUrl = 'https://area-epitech-2018.herokuapp.com/';

    user = {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        userImage: '',
        token: ''
    };

    public isConnected() {
        const user = JSON.parse(localStorage.getItem('appUser'));
        if ((user != null) && user.token != null) {
            return (true);
        }
        return (false);
    }

    public login(email, password) {

        const body = {
            'email': email,
            'password': password
        };
        return this.http.post(this.baseUrl + 'login', body, this.httpOptions);
    }

    public register(email, password, firstname, lastname) {

        const body = {
            'email': email,
            'password': password,
            'first_name': firstname,
            'last_name': lastname,
        };
        return this.http.post(this.baseUrl + 'register', body, this.httpOptions);
    }

    public logout() {
        localStorage.removeItem('appUser');
        this.router.navigate(['/pages/login']).then();
    }

    public getUser() {
        return JSON.parse(localStorage.getItem('appUser'));
    }

    public setUser(token) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };
        this.http.get(this.baseUrl + 'me', httpOptions)
            .subscribe(res => {
                this.user.userImage = 'https://api.adorable.io/avatars/50/abott@adorable.png';
                // @ts-ignore
                this.user.last_name = res.user.last_name;
                // @ts-ignore
                this.user.first_name = res.user.first_name;
                // @ts-ignore
                this.user.token = res.user.token;
                // @ts-ignore
                this.user.id = res.user._id;
                // @ts-ignore
                this.user.email = res.user.email;
                localStorage.setItem('appUser', JSON.stringify(this.user));
                this.router.navigate(['pages/myWaves']).then();
            });
    }

    public async changeUserPassword(password) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.getUser().token
            })
        };
        let data = {
            password: password
        };
        // @ts-ignore
        let res = await this.http.put(this.baseUrl + 'updatePassword', data, httpOptions).toPromise();
    }

    public async updateUser(firstName, lastName, email) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.getUser().token
            })
        };
        let data = {
            first_name: firstName,
            last_name: lastName,
            email: email
        };
        // @ts-ignore
        let res = await this.http.put(this.baseUrl + 'update', data, httpOptions).toPromise();
        // @ts-ignore
        if (res.data === 'saved') {
            let userstored = this.getUser();
            // @ts-ignore
            userstored.last_name = lastName;
            this.user.last_name = lastName;
            // @ts-ignore
            userstored.first_name = firstName;
            this.user.first_name = firstName;
            // @ts-ignore
            userstored.email = email;
            this.user.email = email;
            localStorage.setItem('appUser', JSON.stringify(userstored));
        }
    }
}
