import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Area } from '@antv/g2plot';

import { ObservabilityService } from '../observability.service';

@Component({
  selector: 'v-mongo-document-operations',
  template: `
    <ng-template #title><b i18n>文档操作</b></ng-template>
    <nz-card nzSize="small" [nzTitle]="title">
      <div #ref></div>
    </nz-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentOperationsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private plot?: Area;
  private subscription!: Subscription;

  constructor(private observability: ObservabilityService) {}

  ngOnInit(): void {
    this.subscription = this.observability.interval
      .pipe(
        switchMap(v => timer(0, v * 1000)),
        switchMap(() => this.observability.getMongoDocumentOperations())
      )
      .subscribe(data => {
        if (this.plot) {
          this.plot.changeData(data.map(v => ({ time: v[0], value: v[1], operate: this.getOperate(v[2] as number) })));
        }
      });
  }

  ngAfterViewInit(): void {
    this.plot = new Area(this.ref.nativeElement, {
      height: 200,
      data: [],
      xField: 'time',
      yField: 'value',
      seriesField: 'operate',
      meta: {
        value: {
          alias: '数值',
          formatter: value => `${value} ops`
        }
      }
    });
    this.plot.render();
  }

  ngOnDestroy(): void {
    this.plot?.destroy();
    this.subscription.unsubscribe();
  }

  getOperate(v: number): string {
    switch (v) {
      case 1:
        return $localize`插入`;
      case 2:
        return $localize`更新`;
      case 3:
        return $localize`删除`;
      default:
        return $localize`返回`;
    }
  }
}
