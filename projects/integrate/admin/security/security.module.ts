import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { AuditComponent } from './audit/audit.component';
import { AuditModule } from './audit/audit.module';
import { PolicyComponent } from './policy/policy.component';
import { PolicyModule } from './policy/policy.module';
import { SecurityService } from './security.service';
import { SessionComponent } from './session/session.component';
import { SessionModule } from './session/session.module';

export const security: Routes = [
  {
    path: 'policy',
    component: PolicyComponent,
    data: {
      breadcrumb: '策略配置'
    }
  },
  {
    path: 'session',
    component: SessionComponent,
    data: {
      breadcrumb: '在线会话'
    }
  },
  {
    path: 'audit',
    component: AuditComponent,
    data: {
      breadcrumb: '审计日志'
    }
  }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, NzPipesModule, PolicyModule, SessionModule, AuditModule],
  providers: [SecurityService]
})
export class SecurityModule {}