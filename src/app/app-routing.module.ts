import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// We will use module's lazy loading
const shipModule = () => import('./ships/ships.module').then(m => m.ShipsModule);
const authModule = () => import('./auth/auth.module').then(m => m.AuthModule);
const routes: Routes = [
  {
    path: 'starships',
    loadChildren: shipModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: authModule,
  },
  {
    path: '',
    redirectTo: 'starships',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'starships' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
