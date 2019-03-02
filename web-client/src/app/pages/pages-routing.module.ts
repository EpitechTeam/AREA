import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Page Components
import {MyWavesComponent} from './my-waves/my-waves.component';
import {ManageComponent} from './manage/manage.component';
import {AddWaveComponent} from './my-waves/add-wave/add-wave.component';
import {EditWaveComponent} from './my-waves/edit-wave/edit-wave.component';


const routes: Routes = [
    { path: 'myWaves', component: MyWavesComponent },
    { path: 'myWaves/addWave', component: AddWaveComponent },
    { path: 'myWaves/editWave', component: EditWaveComponent },
    { path: 'manage', component: ManageComponent },
    { path: 'manage/:type', component: ManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
