import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {
    SocialLoginModule,
    AuthServiceConfig,
    FacebookLoginProvider,
} from 'angularx-social-login';
import {FormsModule} from '@angular/forms';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import { ClientapkComponent } from './clientapk/clientapk.component';

// Configs
export function getAuthServiceConfigs() {

    const fbLoginOptions = {
        scope: 'email,user_likes,user_events,user_tagged_places,user_posts,user_photos,user_birthday,' +
            'user_hometown,user_location,user_likes,user_events,user_photos,' +
            'user_friends,user_status,user_tagged_places,user_posts,user_gender,' +
            'user_link,manage_pages,pages_show_list,public_profile',
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
        ClientapkComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        SocialLoginModule,
        NgxJsonViewerModule
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
