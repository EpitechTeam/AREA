import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTriggerComponent } from './my-waves/add-trigger/add-trigger.component';

// Page Components
import { MyWavesComponent } from './my-waves/my-waves.component';

const routes: Routes = [
  { path: 'myWaves', component: MyWavesComponent },
  { path: 'myWaves/addTrigger', component: AddTriggerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
