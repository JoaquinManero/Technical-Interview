import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MainComponent } from './core/layouts/main/main.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, CoreModule, CommonModule],
  bootstrap: [MainComponent],
})
export class AppModule {}
