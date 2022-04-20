import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';

import { WpxService } from '@weplanx/ng';

@Injectable()
export class PagesActivated implements CanActivateChild {
  constructor(private wpx: WpxService) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot): true {
    this.wpx.pageId = childRoute.params['pageId'];
    return true;
  }
}