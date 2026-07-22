import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-landscape-notice',
  templateUrl: './landscape-notice.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./landscape-notice.component.scss'],
})
export class LandscapeNoticeComponent {
  @Input() desktop: boolean = false

  constructor() {}
}
