import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';

// Page Components
import { MyWavesComponent } from './my-waves/my-waves.component';
import { AddTriggerComponent } from './my-waves/add-trigger/add-trigger.component';
import { ServicesComponent } from './my-waves/services/services.component';
import { TaViewComponent } from './my-waves/ta-view/ta-view.component';

@NgModule({
  declarations: [
    MyWavesComponent,
    AddTriggerComponent,
    ServicesComponent,
    TaViewComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
