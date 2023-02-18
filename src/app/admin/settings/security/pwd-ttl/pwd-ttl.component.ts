import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-security-pwd-ttl',
  templateUrl: './pwd-ttl.component.html'
})
export class PwdTtlComponent implements OnInit {
  tips = {
    pwd_ttl: {
      default: {
        required: $localize`The days cannot be empty`
      }
    }
  };
  @Input() values!: Record<string, any>;
  formatterTimes = (value: number): string => $localize`${value} day`;
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      pwd_ttl: [0, [Validators.required]]
    });
    const data = {
      pwd_ttl: this.values['pwd_ttl'] / 86400e9
    };
    this.form.patchValue(data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    data.pwd_ttl = data.pwd_ttl * 86400e9;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`Data update complete`);
      this.modalRef.triggerOk();
    });
  }
}