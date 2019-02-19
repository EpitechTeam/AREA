import { Injectable } from '@angular/core';
import {UserAgentApplication} from 'msal';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {
    AuthService,
    FacebookLoginProvider,
} from 'angularx-social-login';
import {UserService} from './user.service';
import {AppComponent} from './app.component';

@Injectable({
    providedIn: 'root'
})
export class ConnectorService {
    private office365 = new Office365(this.http, this.userService);
    private epitech = new Epitech(this.http, this.userService);
    private facebook = new Facebook(this.http, this.socialAuthService, this.userService);
    Connectors = [
        this.office365,
        this.epitech,
        this.facebook
    ];

    constructor(private http: HttpClient,
                private socialAuthService: AuthService,
                private userService: UserService) { }

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
    name = 'Office 365';
    class = 'office365';
    user = {
        userId: '',
        userName: '',
        userImage: '',
        userEmail: ''
    };
    config = {
        clientID: '6cf6d447-0635-4914-a848-4cb72e761e39',
        authority: 'https://login.microsoftonline.com/common',
        graphScopes: ['user.read', 'calendars.read',
            'calendars.read.shared',
            'calendars.readwrite',
            'calendars.readwrite.shared',
            'email',
            'offline_access',
            'openid',
            'profile',
            'mail.send',
            'mail.send.shared']
    };
    msalObj =
        new UserAgentApplication(
            this.config.clientID,
            this.config.authority,
            null,
            {storeAuthStateInCookie: false,
                cacheLocation: 'localStorage'});

    connected = false;

    constructor(private http: HttpClient, private userService: UserService) {}

    public getConnected() {
        return (this.connected);
    }

    public isConnected() {
        return (this.connected);
    }

    public logout() {
        // todo : http get LOGOUT + this.connnected = false;
    }

    public login() {
        const self = this;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        this.msalObj.loginPopup(self.config.graphScopes)
            .then(function (idToken) {
                self.msalObj.acquireTokenPopup(self.config.graphScopes).then(function (accessToken) {
                    const data  = {
                        accessToken: accessToken
                    };
                    self.http.post(self.userService.baseUrl + 'office365', data, httpOptions)
                        .subscribe(res => {
                            self.connected = true;
                            self.getData();
                        });
                }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                // login failure
                console.log(error);
            });
        return (false);
    }

    public getData() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };

        this.http.get(this.userService.baseUrl + 'outlook/getMe', httpOptions)
            .subscribe(userData => {
                console.log(userData);
                // // @ts-ignore
                // this.userId = userData.id;
                // // @ts-ignore
                // this.userName = userData.displayName;
            });
    }
}

class Epitech {
    name = 'Epitech';
    class = 'epitech';
    user = {};
    config = {
    };

    constructor(private http: HttpClient, private userService: UserService) {}

    public getConnected() {
    }

    public isConnected() {
        if (localStorage.getItem('epitechToken') == null) {
            return (false);
        }
        return (true);
    }

    public logout() {
        localStorage.removeItem('epitechToken');
    }

    public login() {
        const self = this;
    }

    public getData() {
        //   const token = this.getToken();
        //   const options = {
        //     headers: new HttpHeaders({
        //       'Content-Type': 'application/json',
        //       'Authorization': 'Bearer ' + token,
        //     })
        //   };
        //
        //   return this.http.get('');
    }
}

class Facebook {
    name = 'Facebook';
    class = 'facebook';
    user = {
        userId: '',
        userName: '',
        userImage: '',
        userEmail: ''
    };
    connected = false;

    constructor(private http: HttpClient,
                private socialAuthService: AuthService,
                private  userService: UserService) {}

    public async getConnected() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const result =  await this.http.get(this.userService.baseUrl + 'facebook/isConnected', httpOptions)
            .toPromise();
        // @ts-ignore
        this.connected = result.type;
        // @ts-ignore
        return (result.type);
    }

    public isConnected(): boolean {
        return (this.connected);
    }

    public logout() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        this.http.get(this.userService.baseUrl + 'facebook/logout', httpOptions)
            .subscribe(res => {
                const user = this.userService.getUser();
                user.userImage = 'https://api.adorable.io/avatars/50/abott@adorable.png';
                localStorage.removeItem('appUser');
                localStorage.setItem('appUser', JSON.stringify(user));
                localStorage.removeItem('facebookUser');
                this.connected = false;
            });
    }

    public login() {
        let socialPlatformProvider;
        const self = this;

        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                const data  = {
                    // @ts-ignore
                    accessToken: userData.authToken,
                    id: userData.id,
                };
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': this.userService.getUser().token
                    })
                };
                this.http.post(this.userService.baseUrl + 'facebook/addFacebookConnection', data, httpOptions)
                    .subscribe(res => {
                        this.connected = true;
                        this.getData();
                    });
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
                // console.log(res);
                // @ts-ignore
                if (res.me.name === 'FacebookApiException')
                    return ;
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
