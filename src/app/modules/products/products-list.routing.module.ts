import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { ModifyComponent } from './modify/modify.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListProductsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'modify/:id', component: ModifyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsListRoutingModule {}
