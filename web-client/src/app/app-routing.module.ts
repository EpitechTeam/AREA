import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'pages/myWaves', pathMatch: 'full'},
  { path: 'test.png', redirectTo: 'test.png'},
  { path: 'pages', canActivate: [AuthGuard], loadChildren: './pages/pages.module#PagesModule' },
  { path: 'pages', loadChildren: './pages/pages-blank.module#PagesBlankModule' },
  { path: '**', redirectTo: '/pages/myWaves', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
