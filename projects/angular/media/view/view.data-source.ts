import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { AnyDto, Data } from '@weplanx/ng';

import { MediaService } from '../media.service';
import { Media } from '../types';

export class WpxMediaViewDataSource extends Data<AnyDto<Media>> implements DataSource<Array<AnyDto<Media>>> {
  private readonly stream = new BehaviorSubject<Array<Array<AnyDto<Media>>>>([]);
  private readonly disconnect$ = new Subject<void>();
  private readonly indexs: Set<number> = new Set<number>();
  private readonly dict: Map<string, AnyDto<Media>> = new Map<string, AnyDto<Media>>();
  private cache: Array<AnyDto<Media>> = [];
  /**
   * 每个列表包含卡片数量
   */
  n = 0;

  constructor(private media: MediaService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Array<Array<AnyDto<Media>>>> {
    collectionViewer.viewChange.pipe(takeUntil(this.disconnect$)).subscribe(range => {
      const index = Math.floor((range.end * this.n) / this.size) + 1;
      if (this.indexs.has(index)) {
        return;
      }
      this.index = index;
      this.fetch(false);
    });
    return this.stream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  setSearchText(v: string): void {
    this.filter = { name: { $regex: v } };
  }

  clearSearchText(): void {
    this.filter = {};
  }

  fetch(refresh = false): void {
    if (refresh) {
      this.cache = [];
      this.stream.next([]);
      this.indexs.clear();
      this.dict.clear();
    }
    this.media.findByPage(this, refresh).subscribe(v => {
      const values: Array<Array<AnyDto<Media>>> = [];
      this.cache.splice(this.index * this.size, this.size, ...v);
      this.cache.forEach((value, index) => {
        this.dict.set(value._id, value);
        const n = Math.trunc(index / this.n);
        if (!values[n]) {
          values[n] = [];
        }
        values[n].push(value);
      });
      this.indexs.add(this.index);
      this.stream.next(values);
    });
  }

  /**
   * 获取指定数据
   * @param id
   */
  getValue(id: string): AnyDto<Media> {
    return this.dict.get(id)!;
  }

  /**
   * 获取 URL
   */
  getUrls(ids: string[]): string[] {
    return ids.map(v => this.dict.get(v)!.url);
  }
}