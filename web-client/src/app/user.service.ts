import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export interface User {
  _id: string;
  token: string;
  connected: boolean;

  firstname: string;
  lastname: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router) {
  }

  _user: User = {
    _id: '',
    token: '',
    connected: true,
    firstname: 'David',
    lastname: 'Zakrzewski',
    email: 'david.zakrzewski@epitech.eu'
  };

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // };

  // baseUrl = '';

  public isConnected() {
    if (!this._user.connected) {
    }
    return (this._user.connected);
  }

  login(email, password) {

    const body = {
      'email': email,
      'password': password
    };
    this._user.connected = true;
    // this.http.post(this.baseUrl, body, this.httpOptions)
    //   .subscribe(response => { } );

    this.router.navigate(['pages/myWaves']).then();
  }

  logout() {
    this._user.connected = false;
    this.router.navigate(['/pages/login']).then();
  }

}
