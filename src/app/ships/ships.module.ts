import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsRoutingModule } from './ships-routing.module';
import { ShipsComponent } from './ships.component';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { ShipItemComponent } from './ships-list/ship-item/ship-item.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';
import { MeComponent } from './me/me.component';
import { FormsModule } from '@angular/forms';
import { ShipDetailsHeaderComponent } from './components/ship-details-header/ship-details-header.component';


@NgModule({
  declarations: [
    ShipsComponent,
    ShipsListComponent,
    ShipItemComponent,
    ShipDetailsComponent,
    MeComponent,
    ShipDetailsHeaderComponent,
  ],
  imports: [
    CommonModule,
    ShipsRoutingModule,
    FormsModule
  ]
})
export class ShipsModule { }
