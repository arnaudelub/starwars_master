import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipsRoutingModule } from './ships-routing.module';
import { ShipsComponent } from './ships.component';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { ShipItemComponent } from './ships-list/ship-item/ship-item.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';


@NgModule({
  declarations: [
    ShipsComponent,
    ShipsListComponent,
    ShipItemComponent,
    ShipDetailsComponent,
  ],
  imports: [
    CommonModule,
    ShipsRoutingModule
  ]
})
export class ShipsModule { }
