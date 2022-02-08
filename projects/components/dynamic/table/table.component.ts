import { Component, OnInit } from '@angular/core';

import { TableField } from '@weplanx/components/table';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DynamicService } from '../dynamic.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'wpx-dynamic-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  key?: string;
  fields: TableField[] = [];

  constructor(public dynamic: DynamicService, private modal: NzModalService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page?.schema;
    this.key = schema!.key;
    this.fields = [
      ...Object.entries(schema?.fields ?? [])
        .filter(([k, v]) => !v.hide)
        .sort(([ak, a], [bk, b]) => a.sort - b.sort)
        .map<TableField>(([k, v]) => {
          return {
            key: k,
            label: v.label,
            type: v.type,
            description: v.description
          };
        })
    ];
  }

  form(editable?: any): void {
    this.modal.create({
      nzTitle: !editable ? '新增' : '编辑',
      nzContent: FormComponent,
      nzComponentParams: {
        editable
      },
      nzOnOk: () => {
        // this.getData();
      }
    });
  }
}
