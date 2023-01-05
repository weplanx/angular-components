import { Component, Type } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { AppService } from '@app';
import { BackupEmailComponent } from '@common/profile/backup-email/backup-email.component';
import { EmailComponent } from '@common/profile/email/email.component';
import { NameComponent } from '@common/profile/name/name.component';
import { PasswordComponent } from '@common/profile/password/password.component';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  constructor(
    public app: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private draw: NzDrawerRef
  ) {}

  /**
   * 设置对话框
   * @param component
   * @param callback
   * @private
   */
  private setModal(component: Type<void>, callback?: () => void): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: component,
      nzOnOk: () => {
        if (!callback) {
          this.app.getUser().subscribe(() => {});
          return;
        }
        callback();
      }
    });
  }

  /**
   * 设置电子邮件
   */
  setEmail(): void {
    this.setModal(EmailComponent, () => {
      this.app.logout().subscribe(() => {
        this.draw.close();
        this.app.user = undefined;
        this.router.navigateByUrl('/login');
      });
    });
  }

  /**
   * 设置称呼
   */
  setName(): void {
    this.setModal(NameComponent);
  }

  /**
   * 设置密码
   */
  setPassword(): void {
    this.setModal(PasswordComponent);
  }

  /**
   * 备用邮件
   */
  setBackupEmail(): void {
    this.setModal(BackupEmailComponent);
  }

  linkFeishu(): void {
    this.app.oauth('link').subscribe(v => {
      const popup = window.open(v, '', 'width=800,height=640');
      const $timer = timer(0, 500).subscribe(() => {
        if (popup?.closed) {
          $timer.unsubscribe();
          this.app.getUser().subscribe(() => {});
        }
      });
    });
  }

  unlinkFeishu(): void {
    // this.app.setUser({ reset: 'feishu' }).subscribe(() => {
    //   this.message.success('关联已取消');
    //   this.app.getUser().subscribe(() => {});
    // });
  }
}
