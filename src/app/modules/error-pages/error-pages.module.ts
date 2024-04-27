import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from './error-pages.routes';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ErrorPagesModule {}
