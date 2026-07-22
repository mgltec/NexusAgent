import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-lay-off-account',
  templateUrl: './LayOffAccount.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./LayOffAccount.component.css']
})
export class LayOffAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
