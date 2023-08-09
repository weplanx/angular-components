import { Component, Type } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { AppService } from '@app';
import { TotpComponent } from '@common/components/nav/profile/totp/totp.component';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AvatarComponent } from './avatar/avatar.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';
import { PhoneComponent } from './phone/phone.component';

@Component({
  selector: 'app-layout-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  index = 1;

  constructor(
    public app: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private drawer: NzDrawerRef
  ) {}

  private setModal(component: Type<void>, callback?: () => void): void {
    this.modal.create({
      nzTitle: $localize`用户更新`,
      nzWidth: 420,
      nzContent: component,
      nzOnOk: () => {
        if (!callback) {
          this.app.getUser().subscribe(() => {
            console.debug('user:update');
          });
          return;
        }
        callback();
      }
    });
  }

  setEmail(): void {
    this.setModal(EmailComponent, () => {
      this.app.logout().subscribe(() => {
        this.drawer.close();
        this.app.user.set(null);
        this.router.navigateByUrl('/login');
      });
    });
  }

  setName(): void {
    this.setModal(NameComponent);
  }

  setAvatar(): void {
    this.setModal(AvatarComponent);
  }

  setPassword(): void {
    this.setModal(PasswordComponent);
  }

  setPhone(): void {
    this.setModal(PhoneComponent);
  }

  setTotp(): void {
    this.setModal(TotpComponent);
  }

  unsetTotp(): void {
    this.app.unsetUser('totp').subscribe(() => {
      this.message.success($localize`取消成功`);
      this.app.getUser().subscribe(() => {
        console.debug('user:update');
      });
    });
  }

  linkLark(): void {
    this.app.oauth('link').subscribe(v => {
      const popup = window.open(v, '', 'width=800,height=640');
      const $timer = timer(0, 500).subscribe(() => {
        if (popup?.closed) {
          $timer.unsubscribe();
          this.app.getUser().subscribe(() => {
            console.debug('user:update');
          });
        }
      });
    });
  }

  unlinkLark(): void {
    this.app.unsetUser('lark').subscribe(() => {
      this.message.success($localize`取消关联成功`);
      this.app.getUser().subscribe(() => {
        console.debug('user:update');
      });
    });
  }
}
