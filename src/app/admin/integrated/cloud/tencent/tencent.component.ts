import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-integrated-cloud-tencent',
  templateUrl: './tencent.component.html'
})
export class TencentComponent implements OnInit {
  form!: FormGroup;
  tips = {
    TencentSecretId: {
      default: {
        required: $localize`SecretId 不能为空`
      }
    },
    TencentSecretKey: {
      default: {
        required: $localize`SecretKey 不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: R,
    private wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      TencentSecretId: [null, [Validators.required]],
      TencentSecretKey: [null, [Validators.required]]
    });
    this.form.patchValue({
      TencentSecretId: this.data['TencentSecretId']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}