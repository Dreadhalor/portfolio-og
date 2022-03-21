import { Component, Input, OnInit } from '@angular/core';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'sh-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  constructor(private site: SiteService, private safe: SafePipe) {}

  @Input('index') index: number | null = null;
  @Input('disabled') disabled: boolean = false;

  ngOnInit(): void {}

  getPointerEvents() {
    return this.site.getSnapped() ? 'auto' : 'none';
  }

  getProject() {
    let projects = this.site.projects;
    if (this.index === null || this.index >= this.site.projects.length)
      return this.site.projects[0];
    let project = projects[this.index];
    return project;
  }
  getProjectURL() {
    if (this.index === null) return '';
    let project = this.getProject();
    let url = project.url;
    // let sanitizedURL = new SafePipe(url);
    // console.log(url);
    return url;
  }
}
