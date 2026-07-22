import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NgAgentSite';

  constructor(private router: Router){

  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url.includes('/mainclassic')) {
          document.body.classList.add('classic');
        } else {
          document.body.classList.remove('classic');
          sessionStorage.removeItem('pId');
        }
      }
    });
  }
  
}
