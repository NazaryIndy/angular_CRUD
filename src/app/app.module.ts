import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { fakeBackendProvider} from './services/good.interceptor';

import {
  GoodsComponent,
  GoodsListComponent,
  GoodsWrapperComponent,
  GoodsSelectedComponent
} from './components';

import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    GoodsListComponent,
    GoodsWrapperComponent,
    GoodsSelectedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
