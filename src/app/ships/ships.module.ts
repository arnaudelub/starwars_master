import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsComponent } from './ships.component';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';



@NgModule({
  declarations: [ShipsComponent, ShipsListComponent, ShipDetailsComponent,],
  imports: [
    CommonModule
  ]
})
export class ShipsModule { }
