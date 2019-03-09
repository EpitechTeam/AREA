import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.service';
import {ClientapkComponent} from './clientapk/clientapk.component';

const routes: Routes = [
  { path: '', redirectTo: 'pages/myWaves', pathMatch: 'full'},
  { path: 'client.apk', canActivate: [AuthGuard], component: ClientapkComponent},
  { path: 'pages', canActivate: [AuthGuard], loadChildren: './pages/pages.module#PagesModule' },
  { path: 'pages', loadChildren: './pages/pages-blank.module#PagesBlankModule' },
  { path: '**', redirectTo: '/pages/myWaves', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
