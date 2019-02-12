import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesBlankRoutingModule } from './pages-blank-routing.module';

// Pages Blank Components
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesBlankRoutingModule,
    FormsModule
  ]
})
export class PagesBlankModule { }
