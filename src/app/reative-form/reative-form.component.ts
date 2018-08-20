import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,  FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form">
    <div *ngFor="let prop of personProps">
      <label class="control-label"> {{prop.label}} </label>
      <input [type]="prop.type" class="form-control" [formControlName]="prop.key">
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
      formDataObj[prop] = new FormControl(this.formDataObj[prop].value);
      this.personProps.push({
        key: prop,
        label: this.formDataObj[prop].label,
        type: this.formDataObj[prop].type,
      });
    }

    this.form = new FormGroup(formDataObj);
  }
}