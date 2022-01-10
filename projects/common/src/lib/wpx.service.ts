import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';

import { AnyDto, BasicDto, DatasetField, LayoutOption, Page, UploadOption } from './types';
import { Dataset } from './utils/dataset';

@Injectable({ providedIn: 'root' })
export class WpxService {
  /**
   * 静态资源地址
   */
  assets = '/assets';
  /**
   * 上传地址
   */
  upload?: UploadOption;
  /**
   * 导航数据
   */
  readonly navs: BehaviorSubject<Array<AnyDto<Page>>> = new BehaviorSubject<Array<AnyDto<Page>>>([]);
  /**
   * 动态页面索引
   */
  readonly pages: BehaviorSubject<Record<string, AnyDto<Page>>> = new BehaviorSubject<Record<string, AnyDto<Page>>>({});
  /**
   * 当前页面
   */
  pageId?: string;
  /**
   * 布局设置
   */
  layout: Partial<LayoutOption> = {};

  constructor(
    @Optional() private router: Router,
    @Optional() private http: HttpClient,
    @Optional() private storage: StorageMap
  ) {}

  /**
   * 设置静态资源
   * @param value
   */
  setAssets(value: string): void {
    this.assets = value;
  }

  /**
   * 设置上传配置
   * @param value
   */
  setUpload(value: UploadOption): void {
    this.upload = value;
  }

  /**
   * 载入页面数据
   * @param data 页面传输对象
   */
  loadPages(data: Array<AnyDto<Page>>): void {
    const navs: Array<AnyDto<Page>> = [];
    const pages: Record<string, AnyDto<Page>> = {};
    for (const x of data) {
      pages[x._id] = x;
      x['children'] = [];
      if (!x.parent) {
        x['path'] = [x._id];
        navs.push(x);
      } else {
        if (pages.hasOwnProperty(x.parent)) {
          x['path'] = [...pages[x.parent]['path'], x._id];
          pages[x.parent]['children'].push(x);
        }
      }
    }
    this.navs.next(navs);
    this.pages.next(pages);
  }

  /**
   * 设置数据源
   * @param key 本地存储键值
   * @param fields 数据源字段
   */
  dataset<T extends BasicDto>(key: string, fields: DatasetField[]): Dataset<T> {
    return new Dataset<T>(this.storage, `dataset:${key}`, fields);
  }
}
