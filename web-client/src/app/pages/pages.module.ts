import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {HttpClientModule} from '@angular/common/http';

// Page Components
import {MyWavesComponent} from './my-waves/my-waves.component';
import {ServicesComponent} from './my-waves/services/services.component';
import {ManageComponent} from './manage/manage.component';
import {AddWaveComponent} from './my-waves/add-wave/add-wave.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        MyWavesComponent,
        ServicesComponent,
        ManageComponent,
        AddWaveComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        HttpClientModule,
        FormsModule
    ]
})
export class PagesModule {
}
