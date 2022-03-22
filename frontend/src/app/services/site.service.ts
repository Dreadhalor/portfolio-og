import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  public projects = [
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
    },
    // {
    //   name: 'ascii-video',
    //   url: 'https://ascii-video.glitch.me/',
    // },
    {
      name: 'NetWorth',
      description:
        'A finance app for tracking your spending across multiple bank accounts.',
      url: 'https://networth.cool',
      image: 'NetWorth.png',
    },
    {
      name: 'BetterMUN.com',
      description: 'The greatest MUN app the world has ever seen.',
      url: 'https://bettermun.com/about',
      image: 'BetterMUN.png',
    },
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
    },
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
    },
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
    },
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
    },
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
    },
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
    },
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
    },
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
    },
    {
      name: 'VisualizeIt!',
      description: 'A pathfinding visualizer, coded in React',
      url: 'https://scotthetrick.com',
      image: 'VisualizeIt.png',
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
    'VisualizeIt',
    'NetWorth',
    'BetterMUN',
    'Ascii-Cam',
    'hi there',
    'something',
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
