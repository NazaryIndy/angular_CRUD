import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { fakeBackendProvider} from './interceptor';
import { GoodsComponent } from './components/goods/goods.component';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
