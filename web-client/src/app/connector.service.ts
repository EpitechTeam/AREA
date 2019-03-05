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
            case 'intra':
                return this.epitech;
            case 'facebook':
                return this.facebook;
            case 'twitter':
                return this.twitter;
            case 'meteo':
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
            'files.readwrite',
            'mail.send',
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
                // @ts-ignore
                if (!userData.me) {
                    console.log('token expired');
                    this.logout();
                } else {
                    // @ts-ignore
                    this.user.userId = userData.me.id;
                    // @ts-ignore
                    this.user.userEmail = userData.me.mail;
                    // @ts-ignore
                    this.user.userName = userData.me.displayName;
                }
            });
    }
}

class Epitech {
    name = 'Epitech';
    class = 'intra';
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
        this.getData();
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
    }
}

class Weather {
    name = 'Weather';
    class = 'meteo';
    days = [];
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
        this.getData();
    }

    public async getData() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.userService.getUser().token
            })
        };
        const res = await this.http.get(this.userService.baseUrl + 'meteo/getMe', httpOptions).toPromise();
        // @ts-ignore
        if (JSON.parse(res.data).code === 400) {
            return;
        }
        // @ts-ignore
        const temp = JSON.parse(res.data).forecast;
        if (this.days.length === 0) {
            temp.forEach((item, key) => {
                let code = item.weather;
                // 0: Sunny
                // 1: Cloudy
                // 2: Rainy
                // 3: Snowy
                // 4: Stormy
                if ((code === 0)) {
                    code = 0;
                }
                if ((code >= 1 && code <= 7)) {
                    code = 1;
                }
                if ((code >= 10 && code <= 16) || (code >= 40 && code <= 48) || (code >= 210 && code <= 212)) {
                    code = 2;
                }
                if ((code >= 20 && code <= 32) || (code >= 60 && code <= 78) || (code >= 120 && code <= 138) ||
                    (code >= 141 && code <= 142) || (code >= 220 && code <= 232)) {
                    code = 3;
                }
                if ((code >= 100 && code <= 142) || (code === 235)) {
                    code = 4;
                }
                item.weather = code;
                this.days.push(item);
            });
            this.days.splice(7, 7);
        }
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
