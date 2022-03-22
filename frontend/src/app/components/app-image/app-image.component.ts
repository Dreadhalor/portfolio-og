import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sh-app-image',
  templateUrl: './app-image.component.html',
  styleUrls: ['./app-image.component.scss'],
})
export class AppImageComponent implements OnInit {
  @Input('app') app: any | null;
  @Input('sideLength') side_length = 10;
  @Input('centerOffset') center_offset = 0;
  @Input('translateY') translate_y = 0;
  @Input('hideDescription') hide_description = true;
  @Input('descriptionScale') description_scale = 1;

  constructor() {}

  ngOnInit(): void {}

  getIconLength() {
    return this.side_length;
  }

  getDescriptionWidth() {
    let min = Math.min(
      this.getAvailableDescriptionHeight(),
      this.getAvailableDescriptionWidth()
    );
    return min * this.description_scale;
  }
  getDescriptionHeight() {
    let min = Math.min(
      this.getAvailableDescriptionHeight(),
      this.getAvailableDescriptionWidth()
    );
    return min * this.description_scale;
  }
  getAvailableDescriptionHeight() {
    let icon_bottom = -this.translate_y;
    let icon_height = this.getIconLength();
    let available_height =
      document.body.offsetHeight - icon_bottom - icon_height;
    return available_height;
  }
  getAvailableDescriptionWidth() {
    return document.body.offsetWidth;
  }

  getTitle() {
    return this.app?.name ?? '';
  }
  getDescription() {
    return this.app?.description ?? '';
  }
  hasImage() {
    return this.app?.image;
  }
  getImage() {
    if (!this.hasImage()) return '';
    return `assets/${this.app?.image}`;
  }

  get limit() {
    return this.getIconLength();
  }
  doesDescriptionExist() {
    let result = Math.abs(this.center_offset) < this.limit * 2;
    return result;
  }
  getOpacity() {
    return this.hide_description || Math.abs(this.center_offset) > this.limit
      ? 0
      : 1;
  }
}
