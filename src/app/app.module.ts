import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ProductComponent }  from './product.component';
import { ProductService } from './product.service';

@NgModule({
  imports: [     
        BrowserModule,
		HttpModule,
		ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
		ProductComponent
  ],
  providers: [
        ProductService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
