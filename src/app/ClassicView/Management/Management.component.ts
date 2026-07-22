import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-Management',
  templateUrl: './Management.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./Management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
