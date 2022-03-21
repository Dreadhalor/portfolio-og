import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sh-app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
})
export class AppIconComponent implements OnInit {
  @Input('sideLength') side_length = 10;
  @Input('padding') padding = 10;
  @Input('border') border = 10;
  @Input('app') app: string | null = null;

  private gap = 10;
  getGap() {
    return this.gap;
  }

  constructor() {}

  ngOnInit(): void {}

  getSideLength() {
    return this.side_length;
  }
  getPadding() {
    return this.padding;
  }
  getBorder() {
    return `${this.border}px solid white`;
  }

  getTitle() {
    return this.app ?? 'ddd';
  }
}
