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
      icon: 'VisualizeIt_Icon.svg',
      navbar_color: 'rgb(108, 117, 125)',
    },
    // {
    //   name: 'ascii-video',
    //   url: 'https://ascii-video.glitch.me/',
    // },
    {
      name: 'NetWorth',
      description:
        'A finance app for tracking your accounts across multiple banks.',
      url: 'https://networth.cool',
      image: 'NetWorth.png',
      icon: 'NetWorth_Icon.svg',
      navbar_color: 'rgb(255,255,255)',
    },
    {
      name: 'BetterMUN',
      description: 'The greatest MUN app the world has ever seen.',
      url: 'https://bettermun.com/about',
      image: 'BetterMUN.png',
      icon: 'BetterMUN_Icon.svg',
      navbar_color: 'rgb(255,255,255)',
    },
    {
      name: 'ShareMe',
      description: 'A social media app for sharing images.',
      url: 'https://192.168.1.190:3000/login',
      image: 'ShareMe.png',
      icon: 'ShareMe_Icon.svg',
      navbar_color: 'rgb(20,20,20)',
    },
    {
      name: 'ASCII-Cam',
      description: 'The Matrix something something',
      url: 'https://ascii-video.glitch.me',
      image: 'ASCII-Cam.jpg',
      icon: 'ASCII-Cam_Icon.svg',
      navbar_color: 'rgb(0,0,0)',
    },
    {
      name: 'TBD',
      description: 'Gimme a minute to code more',
      url: 'https://scotthetrick.com',
      // image: 'VisualizeIt.png',
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
