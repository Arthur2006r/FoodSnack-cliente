import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'produtos',
        loadChildren: () => import('../pages/produtos/produtos.module').then(m => m.ProdutosPageModule)
      },
      {
        path: 'sacola',
        loadChildren: () => import('../pages/sacola/sacola.module').then(m => m.SacolaPageModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pages/pedidos/pedidos.module').then(m => m.PedidosPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/produtos',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
