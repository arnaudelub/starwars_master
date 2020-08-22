import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// We will use module's lazy loading
const shipModule = () => import('./ships/ships.module').then(m => m.ShipsModule);
const authModule = () => import('./auth/auth.module').then(m => m.AuthModule);
const routes: Routes = [
  {
    path: 'ships',
    loadChildren: shipModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: authModule,
  },
  {
    path: '',
    redirectTo: 'ships',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
