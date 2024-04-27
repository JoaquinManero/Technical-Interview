import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { RouterModule } from '@angular/router';
import { routes } from './products-list.routing.module';
import { CoreModule } from 'src/app/core/core.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ModifyComponent } from './modify/modify.component';

@NgModule({
  declarations: [ListProductsComponent, RegisterComponent, ModifyComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CoreModule, FormsModule, ReactiveFormsModule],
})
export class ProductsListModule {}
