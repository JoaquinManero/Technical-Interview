import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'error',
    loadChildren: () => import('../modules/error-pages/error-pages.module').then((m) => m.ErrorPagesModule),
    data: {
      breadcrumbHide: true,
    },
  },
  {
    path: '',
    loadChildren: () => import('../modules/products/products-list.module').then((m) => m.ProductsListModule),
  },

  {
    path: '**',
    redirectTo: 'error/not-found',
  },
];
