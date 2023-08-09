import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslationModule } from '@common/components/translation/translation.module';
import { ShareModule } from '@common/share.module';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'basic',
        loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule)
      },
      {
        path: 'totp',
        loadChildren: () => import('./totp/totp.module').then(m => m.TotpModule)
      },
      {
        path: 'sms',
        loadChildren: () => import('./sms/sms.module').then(m => m.SmsModule)
      },
      { path: '', redirectTo: 'basic', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, TranslationModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent]
})
export class LoginModule {}
