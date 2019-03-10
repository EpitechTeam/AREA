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
import { EditWaveComponent } from './my-waves/edit-wave/edit-wave.component';
import { AccountComponent } from './account/account.component';
import { AboutComponent } from './about/about.component';
import {AceEditorModule} from 'ng2-ace-editor';

@NgModule({
    declarations: [
        MyWavesComponent,
        ServicesComponent,
        ManageComponent,
        AddWaveComponent,
        EditWaveComponent,
        AccountComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        HttpClientModule,
        FormsModule,
        AceEditorModule
    ]
})
export class PagesModule {
}
