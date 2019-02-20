import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {
    SocialLoginModule,
    AuthServiceConfig,
    FacebookLoginProvider,
} from 'angularx-social-login';

// Configs
export function getAuthServiceConfigs() {

    const fbLoginOptions = {
        scope: 'email,user_likes,user_events,user_tagged_places,user_posts,user_photosŒ',
        return_scopes: true,
        enable_profile_selector: true
    };
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('608250742962709', fbLoginOptions)
            }
        ]);
    return config;
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SocialLoginModule
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
