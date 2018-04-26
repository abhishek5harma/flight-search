import { Component, OnInit } from '@angular/core';
import { FlightService } from './flight.service';
import { Airports } from './airports';
import { FormControl, FormGroupDirective, NgForm, Validators,FormsModule } from '@angular/forms';
import { Airlines } from './airlines';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 



  airports: Airports[];       //to store list of airports 
  airlines: Airlines[];       //to store list of all airlines for One Way
  returnAirlines: Airlines[]; //to store list of all airlines for Return
  formValue: any[];           //stores the data from input form

  constructor(private flightService: FlightService) { }



  // this method calls the FlightService and fetches all the airport data 
  getCities() {

    this.flightService.getCities().subscribe(data => {
      this.airports = data.json();
    });
  }


//This method is triggerd on submitting either One-Way/Return form.
//Form validations are performed in the app.component.html file itself
//Incase you use refine search result you need to provide both Min and Max price limits else it won't run 
//and alerts the user to provide the same.
  search(form: NgForm) {
    console.log(form.value)
    this.formValue = form.value;     //storing form values in local Variable


     //triggered when using Refine Search
    if (form.value.maxPrice != undefined || form.value.minPrice != undefined) {

      //if Max price isn't set
      if (form.value.maxPrice == undefined && form.value.minPrice != undefined) {
        alert("Please specify the Max Price");
      }

      //if Min price isn't set
      else if (form.value.maxPrice != undefined && form.value.minPrice == undefined) { 
        alert("Please specify the Min Price");
      }

      //Finally if both Min/Max price are set
      else { 

        //Filtering and fetching airlines for Return Journey with refine search
        if (form.value.returnDate != undefined) {

          this.flightService.getAirlines().subscribe(data => {
            this.returnAirlines = data.json().filter(x => x.from == form.value.dest
              && x.to == form.value.origin
              && x.Dept_Date == form.value.returnDate
              && x.price >= form.value.minPrice
              && x.price <= form.value.maxPrice);
            console.log("return airlines", this.returnAirlines);

          })
        }

        //Filtering and fetching airlines for One-Way Journey with refine search
        this.flightService.getAirlines().subscribe(data => {
          this.airlines = data.json().filter(x => x.from == form.value.origin
            && x.to == form.value.dest
            && x.Dept_Date == form.value.deptDate
            && x.price >= form.value.minPrice
            && x.price <= form.value.maxPrice);
          console.log("one way airlines", this.airlines);
        })
      }

    }

    //Else if user is not using Refine Search it'll simply fetch the airlines
    else {

       //Filtering and fetching airlines for Return Journey
      if (form.value.returnDate != undefined) {

        this.flightService.getAirlines().subscribe(data => {
          this.returnAirlines = data.json().filter(x => x.from == form.value.dest
            && x.to == form.value.origin
            && x.Dept_Date == form.value.returnDate);
          console.log("return airlines", this.returnAirlines);
        })

      }


      //Filtering and fetching Airlines for One-Way Journey
      this.flightService.getAirlines().subscribe(data => { 
        this.airlines = data.json().filter(x => x.from == form.value.origin
          && x.to == form.value.dest
          && x.Dept_Date == form.value.deptDate);
        console.log("one way airlines", this.airlines);
      })
    }

  }

  ngOnInit() {

    //Need this method to run everytime AppComponent loads
    this.getCities(); 
  }

}
