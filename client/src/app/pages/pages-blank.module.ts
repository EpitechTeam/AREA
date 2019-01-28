import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesBlankRoutingModule } from './pages-blank-routing.module';

// Pages Blank Components
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesBlankRoutingModule
  ]
})
export class PagesBlankModule { }
