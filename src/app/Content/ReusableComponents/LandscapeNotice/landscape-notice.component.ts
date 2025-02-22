import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-landscape-notice',
  templateUrl: './landscape-notice.component.html',
  styleUrls: ['./landscape-notice.component.scss'],
})
export class LandscapeNoticeComponent {
  @Input() desktop: boolean = false

  constructor() {}
}
