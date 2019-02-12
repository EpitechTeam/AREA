import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  public isConnected() {
    const user = JSON.parse(localStorage.getItem('appUser'));
    if ((user != null) && user.token != null) {
      return (true);
    }
    return (false);
  }

  login(email, password) {

    const body = {
      'email': email,
      'password': password
    };
    return this.http.post(this.baseUrl + 'login', body, this.httpOptions);
  }

  register(email, password, firstname, lastname) {

    const body = {
      'email': email,
      'password': password,
      'first_name': firstname,
      'last_name': lastname,
    };
    return this.http.post(this.baseUrl + 'register', body, this.httpOptions);
  }

  logout() {
    localStorage.removeItem('appUser');
    this.router.navigate(['/pages/login']).then();
  }

  getUser() {
    return JSON.parse(localStorage.getItem('appUser'));
  }

}
