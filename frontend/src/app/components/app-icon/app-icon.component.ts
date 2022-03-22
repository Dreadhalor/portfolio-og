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
  @Input('app') app: any | null = null;
  @Input('centerOffset') center_offset = 0;
  @Input('hideDescription') hide_description = true;
  @Input('translateY') translate_y = 0;

  getGap() {
    return document.body.offsetHeight / 10;
  }

  getIconLength() {
    return this.side_length;
  }

  constructor() {}

  ngOnInit(): void {}

  getSideLength() {
    return this.side_length;
  }
  getPadding() {
    return this.hasIcon() ? 0 : this.padding;
  }
  getBorder() {
    return `${this.border}px solid white`;
  }

  getTitle() {
    return this.app?.name ?? '';
  }
  getDescription() {
    return this.app?.description ?? '';
  }
  hasIcon() {
    return this.app?.icon;
  }
  getIcon() {
    if (!this.hasIcon()) return '';
    return `assets/${this.app?.icon}`;
  }
}
