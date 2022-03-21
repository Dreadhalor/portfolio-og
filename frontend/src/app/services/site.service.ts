import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  public projects = [
    {
      name: 'ScottHetrick.com',
      url: 'https://scotthetrick.com',
    },
    // {
    //   name: 'ascii-video',
    //   url: 'https://ascii-video.glitch.me/',
    // },
    {
      name: 'NetWorth',
      url: 'https://networth.cool',
    },
    {
      name: 'BetterMUN.com',
      url: 'https://bettermun.com',
    },
  ];

  private snapped = false;
  setSnapped(snapped: boolean) {
    this.snapped = snapped;
  }
  getSnapped() {
    return this.snapped;
  }

  private test_data = [
    'hi there',
    'something',
    'BetterMUN',
    'NetWorth',
    'Ascii-Cam',
    'VisualizeIt',
    'other app 1',
    'other app 2',
    'other app 3',
    'sfaewf',
    'aaaaaa',
    'go fuck yourself',
    'twelve eleven',
    'what is love',
    'ugh something 1',
    'ugh something 2',
    'ugh something 3',
    'seventeen',
    'going on',
    'thirty',
    'or something like that',
  ];

  getTestData() {
    return this.test_data;
  }

  constructor() {}
}
