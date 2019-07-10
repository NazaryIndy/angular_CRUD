import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { fakeBackendProvider} from './services/good.interceptor';
import { GoodsComponent, GoodsListComponent, GoodsWrapperComponent } from './components';

// import { generateReducer } from './generate.reducer';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    GoodsListComponent,
    GoodsWrapperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    StoreModule.forRoot(reducers)
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
