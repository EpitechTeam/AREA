import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages Blank Component
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesBlankRoutingModule { }
