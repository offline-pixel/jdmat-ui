import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/**/
import { StatusInterceptor } from './_interceptor/status.interceptor';
import { ApiService } from './_services/_api/api.service';
import { LogicService } from './_services/_logic/logic.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    ApiService,
    LogicService,
    { provide: HTTP_INTERCEPTORS, useClass: StatusInterceptor, multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }