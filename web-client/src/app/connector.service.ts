import {Injectable} from '@angular/core';
import {UserAgentApplication} from 'msal';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {
    AuthService,
    FacebookLoginProvider,
} from 'angularx-social-login';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ConnectorService {
    private office365 = new Office365(this.http, this.userService);
    private epitech = new Epitech(this.http, this.userService);
    private weather = new Weather(this.http, this.userService);
    private facebook = new Facebook(this.http, this.socialAuthService, this.userService);
    private twitter = new Twitter(this.http, this.userService, this.router);


    Connectors = [
        this.office365,
        this.facebook,
        this.epitech,
        this.twitter,
        this.weather
    ];

    constructor(private http: HttpClient,
                private socialAuthService: AuthService,
                private userService: UserService,
                private router: Router) {
    }

    getConnector(connector) {
        switch (connector) {
            case 'office365':
                return this.office365;
            case 'epitech':
                return this.epitech;
            case 'facebook':
                return this.facebook;
            case 'twitter':
                return this.twitter;
            case 'weather':
                return this.weather;
        }
    }
}

class Twitter {
    name = 'Twitter';
    class = 'twitter';
    user = {
        userId: '',
        userName: '',
        userImage: '',
        userEmail: ''
    };
    config = {
        consumerKey: '',
        consumerSecret: '',
        endpoint: 'https://api.twitter.com/oauth/'
    };

    connected = false;

    constructor(private http: HttpClient, private userService: UserService,
                private router: Router) {
    }

    public async getConnected() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const result =  await this.http.get(this.userService.baseUrl + 'twitter/isConnected', httpOptions)
            .toPromise();
        // @ts-ignore
        this.connected = result.type;
        // @ts-ignore
        return (result.type);
    }

    public isConnected() {
        return (this.connected);
    }

    public logout() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        this.http.get(this.userService.baseUrl + 'twitter/logout', httpOptions)
            .subscribe(res => {
                this.connected = false;
                this.router.navigate([], {
                    queryParams: {}
                });
            });
    }

    public async login() {
        const self = this;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const res = await this.http.get(this.userService.baseUrl + 'twitter/twitterRequestToken', httpOptions).toPromise();
        // @ts-ignore
        const query = new URLSearchParams(res.data);
        window.location.href = self.config.endpoint + 'authorize?oauth_token=' + query.get('oauth_token');
        return (false);
    }

    public async processLogin(token, verifier) {
        // access_token
        const self = this;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const data = {
            oauth_token: token,
            oauth_verifier: verifier
        };
        await this.http.post(this.userService.baseUrl + 'twitter/accessTokenGenerate', data, httpOptions).toPromise();
        this.connected = true;
        await this.getData();
    }

    public async getData() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };

        const userData = await this.http.get(this.userService.baseUrl + 'twitter/getMe', httpOptions).toPromise();
        // @ts-ignore
        this.user.userId = userData.data.id;
        // @ts-ignore
        this.user.userName = userData.data.name;
        // @ts-ignore
        this.user.userImage = userData.data.profile_image_url;
        this.router.navigate([], {
            queryParams: {}
        }).then();
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
            'files.readwrite',
            'mail.send.shared']
    };
    msalObj =
        new UserAgentApplication(
            this.config.clientID,
            this.config.authority,
            null,
            {
                storeAuthStateInCookie: false,
                cacheLocation: 'localStorage'
            });

    connected = false;

    constructor(private http: HttpClient, private userService: UserService) {
    }

    public async getConnected() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const result = await this.http.get(this.userService.baseUrl + 'outlook/isConnected', httpOptions)
            .toPromise();
        // @ts-ignore
        this.connected = result.type;
        // @ts-ignore
        return (result.type);
    }

    public isConnected() {
        return (this.connected);
    }

    public logout() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        this.http.get(this.userService.baseUrl + 'outlook/logout', httpOptions)
            .subscribe(res => {
                this.connected = false;
            });
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
                    const data = {
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

    public async getData() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };

        this.http.get(this.userService.baseUrl + 'outlook/getMe', httpOptions)
            .subscribe(userData => {
                // console.log(userData);
                if (!userData.me) {
                    this.logout();
                }
                // @ts-ignore
                this.user.userId = userData.me.id;
                // @ts-ignore
                this.user.userEmail = userData.me.mail;
                // @ts-ignore
                this.user.userName = userData.me.displayName;
            });
    }
}

class Epitech {
    name = 'Epitech';
    class = 'epitech';
    user = {
        userId: '',
        userName: '',
        userImage: '',
        userEmail: ''
    };
    config = {};
    showModal = false;

    connected = false;

    constructor(private http: HttpClient, private userService: UserService) {
    }

    public async getConnected() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const result = await this.http.get(this.userService.baseUrl + 'intra/isConnected', httpOptions)
            .toPromise();
        // @ts-ignore
        this.connected = result.type;
        // @ts-ignore
        return (result.type);
    }

    public isConnected() {
        return (this.connected);
    }

    public logout() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        this.http.get(this.userService.baseUrl + 'intra/logout', httpOptions)
            .subscribe(res => {
                this.connected = false;
            });
    }

    public login() {
        const self = this;
        self.showModal = true;
    }

    public async processLogin(token) {
        this.showModal = false;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const data = {
            token: token
        };
        const res = await this.http.post(this.userService.baseUrl + 'intra/addIntraConnection', data, httpOptions).toPromise();
        this.connected = true;
    }

    public async getData() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const res = await this.http.get(this.userService.baseUrl + 'intra/getMe', httpOptions).toPromise();
        // @ts-ignore
        this.user.userEmail = res.me.login;
        // @ts-ignore
        this.user.userImage = 'https://intra.epitech.eu' + res.me.picture;
        // @ts-ignore
        this.user.userName = res.me.title;
        console.log(res);
    }
}

class Weather {
    name = 'Weather';
    class = 'meteo';
    user = {
        userId: '',
        userName: '',
        userImage: '',
        userEmail: ''
    };
    config = {};
    showModal = false;

    connected = false;

    constructor(private http: HttpClient, private userService: UserService) {
    }

    public async getConnected() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const result = await this.http.get(this.userService.baseUrl + 'meteo/isConnected', httpOptions)
            .toPromise();
        // @ts-ignore
        this.connected = result.type;
        // @ts-ignore
        return (result.type);
    }

    public isConnected() {
        return (this.connected);
    }

    public logout() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        this.http.get(this.userService.baseUrl + 'meteo/logout', httpOptions)
            .subscribe(res => {
                this.connected = false;
            });
    }

    public login() {
        const self = this;
        self.showModal = true;
    }

    public async processLogin(city, insee) {
        this.showModal = false;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const data = {
            insee: insee,
            city: city
        };
        const res = await this.http.post(this.userService.baseUrl + 'meteo/addMeteoConnection', data, httpOptions).toPromise();
        this.connected = true;
    }

    public async getData() {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json',
        //         'Authorization': this.userService.getUser().token
        //     })
        // };
        // const res = await this.http.get(this.userService.baseUrl + 'meteo/getMe', httpOptions).toPromise();
        // // @ts-ignore
        // this.user.userEmail = res.me.login;
        // // @ts-ignore
        // this.user.userImage = 'https://intra.epitech.eu' + res.me.picture;
        // // @ts-ignore
        // this.user.userName = res.me.title;
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
                private  userService: UserService) {
    }

    public async getConnected() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const result = await this.http.get(this.userService.baseUrl + 'facebook/isConnected', httpOptions)
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
                const data = {
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
                // @ts-ignore
                if (res.me.name === 'FacebookApiException') {
                    return;
                }
                // @ts-ignore
                this.user.userImage = res.me.picture.data.url;
                // @ts-ignore
                this.user.userId = res.me.id;
                // @ts-ignore
                this.user.userName = res.me.name;
                // @ts-ignore
                this.user.userEmail = res.me.email;

                // @ts-ignore
                let user = this.userService.getUser();
                localStorage.removeItem('appUser');
                user.userImage = this.user.userImage;
                localStorage.setItem('appUser', JSON.stringify(user));
            });
    }
}
