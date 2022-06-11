import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SchemaField } from '@weplanx/ng';

@Component({
  selector: 'app-customize-slot',
  template: `
    <nz-form-item style="width: 320px" [formGroup]="form">
      <nz-form-label [nzRequired]="field.required">{{ field.label }}</nz-form-label>
      <nz-form-control [nzExtra]="field.description ?? ''">
        <app-customize [formControlName]="field.key"></app-customize>
      </nz-form-control>
    </nz-form-item>
  `
})
export class CustomizeSlotComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() field!: SchemaField;

  ngOnInit(): void {
    console.log(this.form);
    console.log(this.field);
  }
}
