import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminService } from './services/admin.services';

@NgModule({
  imports:[
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers:[AdminService, HttpClient,provideHttpClient()],
  exports: [RouterModule],
})
export class AppRoutingModule{}
