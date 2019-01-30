import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';

// Page Components
import { MyWavesComponent } from './my-waves/my-waves.component';
import { AddTriggerComponent } from './my-waves/add-trigger/add-trigger.component';
import { AddActionComponent } from './my-waves/add-action/add-action.component';
import { ServicesComponent } from './my-waves/services/services.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
      MyWavesComponent,
      AddTriggerComponent,
      AddActionComponent,
      ServicesComponent,
      ManageComponent
  ],
  imports: [
      CommonModule,
      PagesRoutingModule
  ]
})
export class PagesModule { }
