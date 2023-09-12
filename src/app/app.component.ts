import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  constructor(
    private app: AppService,
    private wpx: WpxService
  ) {}

  ngOnInit(): void {
    this.app.ping().subscribe(() => {
      console.debug('XSRF:ok');
    });
    if (this.app.cdn) {
      this.wpx.setAssets(this.app.cdn);
    }
    this.wpx.loadScript('cropperjs', 'https://cdn.kainonly.com/npm/cropperjs@1.5.13/dist/cropper.min.js', []);
    this.wpx.loadScript('editorjs', 'https://cdn.jsdelivr.net/npm/@editorjs/editorjs@2.27.2/dist/editorjs.umd.min.js', [
      'https://cdn.jsdelivr.net/npm/@editorjs/paragraph@2.10.0/dist/bundle.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/header@2.7.0/dist/bundle.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/delimiter@1.3.0/dist/bundle.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/underline@1.1.0/dist/bundle.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/nested-list@1.3.0/dist/nested-list.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/checklist@1.5.0/dist/bundle.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/table@2.2.2/dist/table.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/quote@2.5.0/dist/bundle.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/code@2.8.0/dist/bundle.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/marker@1.3.0/dist/bundle.min.js',
      'https://cdn.jsdelivr.net/npm/@editorjs/inline-code@1.4.0/dist/bundle.min.js'
    ]);
    this.app.getUploadOption().subscribe(v => {
      this.wpx.setUpload(v);
    });
  }
}
