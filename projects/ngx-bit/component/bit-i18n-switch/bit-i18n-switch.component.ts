import { Component } from '@angular/core';

import { Bit } from 'ngx-bit';

@Component({
  selector: 'bit-i18n-switch',
  templateUrl: './bit-i18n-switch.component.html'
})
export class BitI18nSwitchComponent {
  constructor(public bit: Bit) {}

  i18nChanged(value: any): void {
    this.bit.i18nChanged.next(value);
  }
}
