import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {ConnectorService} from './connector.service';

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

  baseUrl = 'http://localhost:8080/';

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
    localStorage.removeItem('facebookUser');
    localStorage.removeItem('facebookToken');
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
          if (localStorage.getItem('facebookUser') == null) {
            this.user.userImage = 'https://api.adorable.io/avatars/50/abott@adorable.png';
          } else {
            this.user.userImage = JSON.parse(localStorage.getItem('facebookUser')).userImage;
          }
          // @ts-ignore
          this.user.last_name = res.user.last_name;
          // @ts-ignore
          this.user.first_name = res.user.first_name;
          // @ts-ignore
          this.user.token = res.user.token;
          // @ts-ignore
          this.user.id = res.user._id;
          localStorage.setItem('appUser', JSON.stringify(this.user));
          this.router.navigate(['pages/myWaves']).then();
        });
  }
}
