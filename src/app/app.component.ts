import { Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
  <h1> Dynamic reactive form in angular </h1>
  <app-dynamic-form [formDataObj]="person"></app-dynamic-form>
  `
})
export class AppComponent {
  title = 'Angular';
  person = {
    firstname: {
       label:'Firstname',
       value:'Kehinde',
       type: 'text',
       validators: {
         required: true
       }
    },
    age: {
      label: 'Age',
      value: 32,
      type: 'number',
      validators: {
        min: 18
      }
    },
    gender: {
      label: 'Gender',
      value: 'F',
      type: 'radio',
      options: [
        { label:'Male', value: 'M'},
        { label:'Female', value: 'F'}
      ]
    },
    city: {
      label: 'City',
      value: 'NY',
      type: 'select',
      options:[
        { label:'(choose one)', value: ''},
        { label:'New York', value: 'NY'},
        { label:'Los Angeles', value: 'LA'},
        { label:'Salt Lake City', value: 'SLC'},
      ]
    }
  };
}
