import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-result-authorized',
  template: `
    <nz-result nzStatus="success" nzTitle="授权成功" nzSubTitle="您已成功关联您的 Lark 账号">
      <div nz-result-extra>
        <button nz-button nzType="primary" (click)="close()">关闭</button>
      </div>
    </nz-result>
  `
})
export class AuthorizedComponent implements OnInit {
  constructor(private app: AppService) {}

  ngOnInit(): void {
    console.log(this.app.user);
  }

  close(): void {
    this.app.getUser().subscribe(() => {
      window.close();
    });
  }
}