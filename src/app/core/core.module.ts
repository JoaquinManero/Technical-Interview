import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { ModalStateComponent } from './layouts/modal-state/modal-state.component';

@NgModule({
  declarations: [MainComponent, NavbarComponent, ModalStateComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainComponent, ModalStateComponent],
})
export class CoreModule {}
