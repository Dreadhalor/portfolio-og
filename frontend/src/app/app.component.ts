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

  checkDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setFavicons() {
    let favicon = document.getElementById('favicon') as HTMLLinkElement;
    // let apple_touch_icon = document.getElementById(
    //   'apple-touch-icon'
    // ) as HTMLLinkElement;
    if (this.checkDarkMode()) {
      if (favicon) favicon.href = '/icons/favicon-dark.svg';
      // if (apple_touch_icon)
      //   apple_touch_icon.href = '/icons/apple-touch-icon-dark.png';
    } else {
      if (favicon) favicon.href = '/icons/favicon.svg';
      // if (apple_touch_icon)
      //   apple_touch_icon.href = '/icons/apple-touch-icon.png';
    }
  }

  constructor() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    this.setFavicons();

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => this.setFavicons());
  }
}
