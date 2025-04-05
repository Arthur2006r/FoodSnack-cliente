import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerMaisPageRoutingModule } from './ver-mais-routing.module';

import { VerMaisPage } from './ver-mais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerMaisPageRoutingModule
  ],
  declarations: [VerMaisPage]
})
export class VerMaisPageModule {}
