import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { NzResultModule } from 'ng-zorro-antd/result';

import { AdvancedComponent } from './advanced/advanced.component';
import { AdvancedModule } from './advanced/advanced.module';
import { FactoryComponent } from './factory.component';
import { FactorySerivce } from './factory.serivce';
import { HomeComponent } from './home/home.component';
import { IndexesComponent } from './indexes/indexes.component';
import { IndexesModule } from './indexes/indexes.module';
import { PagesModule } from './pages/pages.module';
import { RulesComponent } from './rules/rules.component';
import { RulesModule } from './rules/rules.module';
import { SchemaComponent } from './schema/schema.component';
import { SchemaModule } from './schema/schema.module';

export const factory: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: '提示'
    }
  },
  {
    path: ':id/schema',
    component: SchemaComponent,
    data: {
      breadcrumb: '内容模型'
    }
  },
  {
    path: ':id/indexes',
    component: IndexesComponent,
    data: {
      breadcrumb: '索引规则'
    }
  },
  {
    path: ':id/rules',
    component: RulesComponent,
    data: {
      breadcrumb: '显隐规则'
    }
  },
  {
    path: ':id/advanced',
    component: AdvancedComponent,
    data: {
      breadcrumb: '高级设置'
    }
  },
  { path: '', redirectTo: '/admin/application/factory/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    WpxModule,
    WpxShareModule,
    NzResultModule,
    PagesModule,
    SchemaModule,
    IndexesModule,
    RulesModule,
    AdvancedModule
  ],
  declarations: [FactoryComponent, HomeComponent],
  providers: [FactorySerivce]
})
export class FactoryModule {}
