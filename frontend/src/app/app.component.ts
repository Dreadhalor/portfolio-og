import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portfolio-site';

  index = 0;
  getIndex() {
    return this.index;
  }
  setIndex(index: number) {
    this.index = index;
  }

  // isNavigating() {
  //   return false;
  // }
}
