import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form">
      <input type="text" [formControlName]="fieldName">
    </form>
    <pre>{{ form.value | json }}</pre>
  `,
  styles: []
})
export class ReativeFormComponent implements OnInit {
  form: FormGroup;
  fieldName = 'age';
  fieldValue = '32';

  ngOnInit() {
    this.form = new FormGroup({
      [this.fieldName]: new FormControl(this.fieldValue)
    });
  }
}
