import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-reseller-program',
  templateUrl: './ResellerProgram.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./ResellerProgram.component.css']
})
export class ResellerProgramComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
