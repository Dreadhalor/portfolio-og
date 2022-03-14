import { Component, OnInit } from '@angular/core';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'sh-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  constructor(private site: SiteService, private safe: SafePipe) {}

  ngOnInit(): void {}

  getProject() {
    let projects = this.site.projects;
    let project = projects[1];
    return project;
  }
  getProjectURL() {
    let project = this.getProject();
    let url = project.url;
    // let sanitizedURL = new SafePipe(url);
    // console.log(url);
    return url;
  }
}
