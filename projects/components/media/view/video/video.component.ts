import { Component, Input } from '@angular/core';

import { AnyDto } from '@weplanx/common';
import { Media } from '@weplanx/components/media';

@Component({
  selector: 'wpx-media-view-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  @Input() data!: AnyDto<Media>;
}