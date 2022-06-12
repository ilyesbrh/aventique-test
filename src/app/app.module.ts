import { HttpClientModule } from '@angular/common/http';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayInfosPipe } from './display-products/display-infos.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DisplayProductsComponent,
    DisplayInfosPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
