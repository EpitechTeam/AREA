import { Injectable } from '@angular/core';
import {UserAgentApplication} from 'msal';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {
  AuthService,
  FacebookLoginProvider,
} from 'angular-6-social-login-v2';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  constructor(private http: HttpClient,
              private socialAuthService: AuthService ) { }

  private office365 = new Office365(this.http);
  private epitech = new Epitech(this.http);
  private facebook = new Facebook(this.http, this.socialAuthService);

  Connectors = [
      this.office365,
      this.epitech,
      this.facebook
  ];

}

class Office365 {
  constructor(private http: HttpClient) {}

  name = 'Office 365';
  class = 'office365';

  userId = '';
  userName = '';
  userImage = '';
  userEmail = '';

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

  IsConnected() {
    if (localStorage.getItem('azureADtoken') == null) {
      return (false);
    }
    return (true);
  }

  GetToken() {
    return (localStorage.getItem('azureADtoken'));
  }

  Logout() {
    localStorage.removeItem('azureADtoken');
    this.msalObj.logout();
    return (false);
  }

  Login() {
    const self = this;

    this.msalObj.loginPopup(self.config.graphScopes)
        .then(function (idToken) {
          // Login Success
          self.msalObj.acquireTokenSilent(self.config.graphScopes).then(function (accessToken) {
            // AcquireTokenSilent Success
            localStorage.setItem('azureADtoken', accessToken);
            self.GetData();
          }, function (error) {
          });
        }, function (error) {
          // login failure
          console.log(error);
        });
    return (false);
  }

  GetData() {
    const token = this.GetToken();
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      })
    };

    this.http.get(this.config.graphEndpoint, options)
        .subscribe(userData => {
          // @ts-ignore
          this.userId = userData.id;
          // @ts-ignore
          this.userName = userData.displayName;
        });
  }
}

class Epitech {
  constructor(private http: HttpClient) {}

  name = 'Epitech';
  class = 'epitech';

  config = {
  };

  IsConnected() {
    if (localStorage.getItem('epitechToken') == null) {
      return (false);
    }
    return (true);
  }

  GetToken() {
    return (localStorage.getItem('epitechToken'));
  }

  Logout() {
    localStorage.removeItem('epitechToken');
  }

  Login() {
    const self = this;
  }

  GetData() {
    const token = this.GetToken();
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
              private socialAuthService: AuthService) {}

  name = 'Facebook';
  class = 'facebook';

  config = {
    clientID: '51f85228-564b-4196-90c9-5c6dc6e4d193',
    authority: 'https://login.microsoftonline.com/common',
    graphScopes: ['user.read'],
    graphEndpoint: 'https://graph.facebook.com/'
  };

  userId = '';
  userName = '';
  userImage = '';
  userEmail = '';

  IsConnected() {
    if (localStorage.getItem('facebookToken') == null) {
      return (false);
    }
    return (true);
  }

  GetToken() {
    return (localStorage.getItem('facebookToken'));
  }

  Logout() {
    localStorage.removeItem('facebookToken');
  }

  Login() {
    let socialPlatformProvider;
    const self = this;

    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          localStorage.setItem('facebookToken', userData.token);
          localStorage.setItem('facebookUser', JSON.stringify(userData));
          self.userId = userData.id;
          self.userName = userData.name;
          self.userImage = userData.image;
          self.userEmail = userData.email;
        }
    );

    return (false);
  }

  GetData() {
    const userData = JSON.parse(localStorage.getItem('facebookUser'));
    this.userId = userData.id;
    this.userName = userData.name;
    this.userImage = userData.image;
    this.userEmail = userData.email;

    this.http.get(this.config.graphEndpoint + this.userId + '/photos?access_token=' + this.GetToken())
        .subscribe(data => {
    });
    // https://graph.facebook.com/{your-user-id}/photos
    //         ?access_token={your-user-access-token}
  }
}
