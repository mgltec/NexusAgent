import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-Lifetime',
  templateUrl: './Lifetime.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./Lifetime.component.css']
})
export class LifetimeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
