import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerMaisPage } from './ver-mais.page';

const routes: Routes = [
  {
    path: '',
    component: VerMaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerMaisPageRoutingModule {}
