import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  public projects = [
    {
      name: 'ascii-video',
      url: 'https://ascii-video.glitch.me/',
    },
    {
      name: 'ScottHetrick.com',
      url: 'https://scotthetrick.com',
    },
    {
      name: 'BetterMUN.com',
      url: 'https://bettermun.com',
    },
  ];

  constructor() {}
}
