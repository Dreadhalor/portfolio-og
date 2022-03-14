import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'sh-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private site: SiteService) {}

  private selected_index = -1;
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

  ngOnInit(): void {}

  getSelectedIndex() {
    return this.selected_index;
  }
  getProjects() {
    return this.site.projects;
  }
  getTestData() {
    return this.test_data;
  }
}
