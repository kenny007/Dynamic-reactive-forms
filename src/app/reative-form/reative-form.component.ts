import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,  FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form">
    <div *ngFor="let prop of personProps">
      <label class="control-label"> {{prop.label}} </label>

      <div [ngSwitch]="prop.type">
      <input  *ngSwitchCase="'text'" [type]="prop.type" class="form-control col-md-6" [formControlName]="prop.key">
      <input  *ngSwitchCase="'number'" [type]="prop.type" class="form-control col-md-6" [formControlName]="prop.key">
     
      <div *ngSwitchCase="'radio'">
      <label *ngFor="let option of prop.options">
      <input class="form-control col-md-6" type="radio" [name]="prop.key" [formControlName]="prop.key"
      [value]="option.value">
          {{ option.label }}
      </label>
      </div>

      <select class="form-control col-md-6" *ngSwitchCase="'select'" [formControlName]="prop.key">
       <option *ngFor="let option of prop.options" [value]="option.value">
           {{ option.label }}
       </option>
      </select>
       </div>
      
    <div class="alert alert-danger col-md-6" *ngIf="form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)">
       <div *ngIf="form.get(prop.key).errors.required">
         You have to provide a value.
       </div>
       <div *ngIf="form.get(prop.key).errors.min">
         You have to provide a value greater or equal to {{ form.get(prop.key).errors.min.min }}
       </div>
       </div>
      </div>
    </form>
    <pre>{{ form.value | json }}</pre>
  `,
  styles: []
})
export class ReativeFormComponent implements OnInit {
  form: FormGroup;
  @Input() formDataObj;

  personProps = [];

  ngOnInit() {
    const formDataObj = {};
    for(const prop of Object.keys(this.formDataObj)) {
      formDataObj[prop] = new FormControl(this.formDataObj[prop].value, this.mapValidator(this.formDataObj[prop].validators));
      this.personProps.push({
        key: prop,
        label: this.formDataObj[prop].label,
        type: this.formDataObj[prop].type,
        options: this.formDataObj[prop].options
      });
    }

    this.form = new FormGroup(formDataObj);
  }
  mapValidator(validators){
    if(validators){
     return Object.keys(validators).map(validationType => {
        if(validationType === 'required'){
          return Validators.required;
        } else if (validationType === 'min'){
          return Validators.min(validators[validationType]);
        }
     })
    } else return [];
  }
}