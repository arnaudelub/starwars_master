import { NgModule, ModuleWithComponentFactories } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipsComponent } from './ships.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';
import { MeComponent } from './me/me.component';

const routes: Routes = [
  {
    path: '',
    component: ShipsComponent,
    children: [
      {
        path: 'details/:id',
        component: ShipDetailsComponent,
      },
      {
        path: 'me',
        component: MeComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipsRoutingModule { }
