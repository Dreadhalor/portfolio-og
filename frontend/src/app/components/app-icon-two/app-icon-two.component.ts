import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sh-app-icon-two',
  templateUrl: './app-icon-two.component.html',
  styleUrls: ['./app-icon-two.component.scss'],
})
export class AppIconTwoComponent implements OnInit {
  @Input('sideLength') side_length = 10;
  @Input('padding') padding = 10;
  @Input('border') border = 10;

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
}
