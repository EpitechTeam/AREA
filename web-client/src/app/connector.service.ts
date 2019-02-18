import { Injectable } from '@angular/core';
import {UserAgentApplication} from 'msal';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {
  AuthService,
  FacebookLoginProvider,
} from 'angular-6-social-login-v2';
import {UserService} from './user.service';
import {AppComponent} from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  constructor(private http: HttpClient,
              private socialAuthService: AuthService,
              private userService: UserService) { }

  private office365 = new Office365(this.http);
  private epitech = new Epitech(this.http);
  private facebook = new Facebook(this.http, this.socialAuthService, this.userService);

  Connectors = [
      this.office365,
      this.epitech,
      this.facebook
  ];

  getConnector(connector) {
    switch (connector) {
      case 'office365':
        return this.office365;
      case 'epitech':
        return this.epitech;
      case 'facebook':
        return this.facebook;
    }
  }
}

class Office365 {
  constructor(private http: HttpClient) {}

  name = 'Office 365';
  class = 'office365';

  user = {
    userId: '',
    userName: '',
    userImage: '',
    userEmail: ''
  };

  config = {
    clientID: '51f85228-564b-4196-90c9-5c6dc6e4d193',
    authority: 'https://login.microsoftonline.com/common',
    graphScopes: ['user.read'],
    graphEndpoint: 'https://graph.microsoft.com/v1.0/me'
  };

  msalObj =
      new UserAgentApplication(
          this.config.clientID,
          this.config.authority,
          null,
          {storeAuthStateInCookie: true,
            cacheLocation: 'localStorage'});

  public isConnected() {
    if (localStorage.getItem('office365User') == null) {
      return (false);
    }
    return (true);
  }

  public logout() {
    localStorage.removeItem('office365User');
    this.msalObj.logout();
    return (false);
  }

  public login() {
    const self = this;

    this.msalObj.loginPopup(self.config.graphScopes)
        .then(function (idToken) {
          // Login Success
          self.msalObj.acquireTokenSilent(self.config.graphScopes).then(function (accessToken) {
            // AcquireTokenSilent Success
            // localStorage.setItem('azureADtoken', accessToken);
            // Todo API Connection
            self.getData();
          }, function (error) {
          });
        }, function (error) {
          // login failure
          console.log(error);
        });
    return (false);
  }

  public getData() {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token,
    //   })
    // };
    //
    // this.http.get(this.config.graphEndpoint, options)
    //     .subscribe(userData => {
    //       // @ts-ignore
    //       this.userId = userData.id;
    //       // @ts-ignore
    //       this.userName = userData.displayName;
    //     });
  }

  public getUser() {
    return ;
  }
}

class Epitech {
  constructor(private http: HttpClient) {}

  name = 'Epitech';
  class = 'epitech';

  user = {};

  config = {
  };

  public isConnected() {
    if (localStorage.getItem('epitechToken') == null) {
      return (false);
    }
    return (true);
  }

  public getToken() {
    return (localStorage.getItem('epitechToken'));
  }

  public logout() {
    localStorage.removeItem('epitechToken');
  }

  public login() {
    const self = this;
  }

  public getData() {
    const token = this.getToken();
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      })
    };

    return this.http.get('');
  }
}

class Facebook {
  constructor(private http: HttpClient,
              private socialAuthService: AuthService,
              private  userService: UserService) {}

  name = 'Facebook';
  class = 'facebook';

  config = {
    graphEndpoint: 'https://graph.facebook.com/'
  };

  user = {
    userId: '',
    userName: '',
    userImage: '',
    userEmail: ''
  };

  public isConnected() {
    if (localStorage.getItem('facebookUser') == null) {
      return (false);
    }
    return (true);
  }

  public getToken() {
    return (localStorage.getItem('facebookToken'));
  }

  public logout() {
    let user = this.userService.getUser();
    user.userImage = 'https://api.adorable.io/avatars/50/abott@adorable.png';
    localStorage.removeItem('appUser');
    localStorage.setItem('appUser', JSON.stringify(user));
    localStorage.removeItem('facebookUser');
  }

  public login() {
    let socialPlatformProvider;
    const self = this;

    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          const data  = {
            accessToken: userData.token
          };
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': this.userService.getUser().token
            })
          };
          this.http.post(this.userService.baseUrl + 'facebook/addFacebookConnection', data, httpOptions)
              .subscribe();
          this.getData();
          localStorage.setItem('facebookToken', userData.token);
        }
    );

    return (false);
  }

  public getData() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.getUser().token
      })
    };

    this.http.get(this.userService.baseUrl + 'facebook/getMe', httpOptions)
        .subscribe(res => {
          // @ts-ignore
          this.user.userImage = res.me.picture.data.url;
          // @ts-ignore
          this.user.userId = res.me.id;
          // @ts-ignore
          this.user.userName = res.me.name;
          // @ts-ignore
          this.user.userEmail = res.me.email;
          if (localStorage.getItem('facebookUser') == null) {
            localStorage.setItem('facebookUser', JSON.stringify(this.user));
          }

          let user = this.userService.getUser();
          localStorage.removeItem('appUser');
          user.userImage = this.user.userImage;
          localStorage.setItem('appUser', JSON.stringify(user));
        });
  }

  public getUser() {
    return (JSON.parse(localStorage.getItem('facebookUser')));
  }
}
