import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'sh-app-icon[app]',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
})
export class AppIconComponent implements OnInit {
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('childstuff') childstuff!: ElementRef;
  @Input('app') app: any;

  private box_width_default = 50;
  private box_height_default = 50;
  private padding = 10;
  private border_width = 1;

  private box_width = 10;
  private box_height = this.box_height_default;
  private hover = false;

  constructor() {}

  ngOnInit(): void {}

  getPadding() {
    // if (this.content) {
    //   console.log('content width');
    //   console.log(this.content.nativeElement.offsetWidth);
    // }
    // if (this.childstuff) {
    //   console.log('child width');
    //   console.log(this.childstuff.nativeElement.offsetWidth);
    // }
    return this.padding;
  }
  clicked() {
    // console.log(this.hover);
    if (this.hover && this.wrapper) {
      this.wrapper.nativeElement.scrollIntoView();
      // console.log('hi');
    }
  }
  getFullWidth() {
    let result = this.hover
      ? this.getContentWidth()
      : this.box_width_default + (this.padding + this.border_width) * 2;
    return result;
  }
  getContentWidth() {
    let result = this.childstuff
      ? this.childstuff.nativeElement.offsetWidth
      : 0;
    result += this.padding * 2;
    // console.log('result: ' + result);
    return result;
  }
  getBoxWidth() {
    // return this.hover ? this.box_width_default : this.box_width;
    return this.box_width_default;
  }
  getBoxHeight() {
    return this.box_height;
  }
  getHover() {
    return this.hover;
  }
  getProperty() {
    return this.hover ? '100px' : '0px';
  }
  getContainerBorder() {
    return `${this.border_width}px solid white`;
  }
  getChildBorder() {
    return `${this.border_width}px solid white`;
  }
  getAppName() {
    return this.app;
  }

  mouseenter() {
    this.hover = true;
  }
  mouseleave() {
    this.hover = false;
  }
}
