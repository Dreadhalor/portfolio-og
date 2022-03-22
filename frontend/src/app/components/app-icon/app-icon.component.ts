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

  // private description_scale = 0.7;
  // getDescriptionWidth() {
  //   let min = Math.min(
  //     this.getAvailableDescriptionHeight(),
  //     this.getAvailableDescriptionWidth()
  //   );
  //   return min * this.description_scale;
  // }
  // getDescriptionHeight() {
  //   let min = Math.min(
  //     this.getAvailableDescriptionHeight(),
  //     this.getAvailableDescriptionWidth()
  //   );
  //   return min * this.description_scale;
  // }
  // getAvailableDescriptionHeight() {
  //   let icon_bottom = -this.translate_y;
  //   let icon_height = this.getIconLength();
  //   let available_height =
  //     document.body.offsetHeight - icon_bottom - icon_height;
  //   return available_height;
  // }
  // getAvailableDescriptionWidth() {
  //   return document.body.offsetWidth;
  // }
  // getDescriptionBottom() {
  //   let available_height = this.getAvailableDescriptionHeight();
  //   let centered_bottom =
  //     this.getIconLength() +
  //     ((available_height - this.getDescriptionHeight()) / 2) * 0.85;
  //   let adjustment = Math.pow(Math.abs(this.center_offset), 2) / 300;

  //   // console.log(adjustment);
  //   return centered_bottom * 1 + adjustment;
  // }
  // getDescriptionLeft() {
  //   // let speed_factor =
  //   //   (document.body.offsetWidth / this.getDescriptionWidth()) * 3;
  //   let speed_factor = this.getDescriptionWidth() / this.getIconLength();
  //   return (
  //     this.center_offset * speed_factor +
  //     (this.getIconLength() - this.getDescriptionWidth()) / 2
  //   );
  // }

  getGap() {
    return document.body.offsetHeight / 10;
  }

  getIconLength() {
    return this.side_length;
  }

  // get limit() {
  //   return this.getIconLength();
  // }
  // doesDescriptionExist() {
  //   let result = Math.abs(this.center_offset) < this.limit * 2;
  //   return result;
  // }
  // getOpacity() {
  //   return this.hide_description || Math.abs(this.center_offset) > this.limit
  //     ? 0
  //     : 1;
  // }

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
