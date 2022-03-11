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
    let project = projects[2];
    return project;
  }
  getProjectURL() {
    let project = this.getProject();
    let url = project.url;
    // let sanitizedURL = new SafePipe(url);
    // console.log(url);
    return url;
  }
  something(eh: any) {
    console.log('fuck off');
    // console.log(eh);
    let frame: HTMLIFrameElement = eh.target;
    let stall = 0;
    let safeguard = 10000;
    // this.tryAgain(frame);
    // let c_window = frame.contentWindow;
    // let doc = console.log(c_window?.document);
    // doc.domain = 'fuck it';
    console.log(frame);
  }
  tryAgain(frame: HTMLIFrameElement) {
    if (frame.contentDocument) console.log(frame.contentDocument);
    else {
      console.log('try again');
      setTimeout(() => this.tryAgain(frame), 500);
    }
  }
}
