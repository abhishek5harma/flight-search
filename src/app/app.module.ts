import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlightService } from './flight.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],

  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
