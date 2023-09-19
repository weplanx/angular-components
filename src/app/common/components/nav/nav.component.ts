import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { ProfileComponent } from '@common/components/nav/profile/profile.component';
import { environment } from '@env';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Input() type?: string;
  experiment = false;

  constructor(
    public app: AppService,
    private drawer: NzDrawerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.experiment = environment.extend.length !== 0;
  }

  profile(): void {
    this.drawer.create<ProfileComponent, { value: string }, string>({
      nzWidth: 640,
      nzContent: ProfileComponent,
      nzClosable: false
    });
  }

  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.user.set(null);
      this.router.navigateByUrl('/login');
    });
  }
}
