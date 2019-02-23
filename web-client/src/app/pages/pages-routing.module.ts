import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Page Components
import {MyWavesComponent} from './my-waves/my-waves.component';
import {AddActionComponent} from './my-waves/add-action/add-action.component';
import {AddTriggerComponent} from './my-waves/add-trigger/add-trigger.component';
import {ManageComponent} from './manage/manage.component';
import {AddWaveComponent} from './my-waves/add-wave/add-wave.component';


const routes: Routes = [
    { path: 'myWaves', component: MyWavesComponent },
    { path: 'myWaves/addWave', component: AddWaveComponent },
    // { path: 'myWaves/addTrigger', component: AddTriggerComponent },
    // { path: 'myWaves/addAction', component: AddActionComponent },
    { path: 'manage', component: ManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
