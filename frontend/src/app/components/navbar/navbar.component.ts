import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as bezier from 'bezier-easing';
import { NavbarPhysics } from 'src/app/helpers/navbar-physics';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'sh-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @Output('selection') selection = new EventEmitter<number>();
  private default_bg = 'rgb(229,231,235)';
  private current_bg = this.default_bg;
  setBG() {
    let selected = this.getSelectedIndex();
    if (selected < 0) {
      this.current_bg = this.default_bg;
      return;
    }
    let project = this.site.projects[selected];
    let color = project?.navbar_color;
    this.current_bg = color ?? this.default_bg;
  }
  getBG() {
    // this.setBG();
    return this.current_bg;
  }

  private side_length = 80;
  private minified_side_length = 30;
  private padding = 5;
  private margin = 10;
  private minified_scale = this.minified_side_length / this.side_length;
  private max_scale = 1;
  private animation_timing_x = 0;
  // private scrolling_y_offset = 80;
  get scrolling_y_offset() {
    return (document.body.offsetHeight / 100) * 12;
  }
  //to prevent animation stuttering when loading between apps
  private max_delta = 1 / 60; //60fps
  private timing_function = bezier(0.42, 0, 0.58, 1); //ease-in-out
  getKeyFrame() {
    return this.timing_function(this.animation_timing_x);
  }
  private animation_seconds = 0.2;
  incrementAnimation(delta: number) {
    let direction = !this.physics.isSelected();
    let result;
    let default_increment = delta / this.animation_seconds;
    let increment = Math.min(delta, this.max_delta) / this.animation_seconds;
    if (direction) {
      result = this.animation_timing_x + default_increment;
    } else result = this.animation_timing_x - increment;
    if (result > 1) result = 1;
    if (result < 0) result = 0;
    this.animation_timing_x = result;
  }
  private border = 1;
  private perspective = 500;
  getPerspective() {
    return this.perspective;
  }

  private physics: NavbarPhysics = new NavbarPhysics(this.site);

  constructor(private site: SiteService) {}

  ngOnInit(): void {
    requestAnimationFrame(this.tick);
    // requestAnimationFrame(this.physics.tick);
    window.addEventListener('pointerup', this.physics.pointerup);
    window.addEventListener('pointermove', this.physics.pointerMoved);
    //for when swiping on the navbar accidentally opens a multitasking menu or some shit, cancel the drag
    window.addEventListener('pointercancel', this.physics.pointerup);
  }
  ngAfterViewInit(): void {
    let anchors = this.getAnchors();
    this.setScrollX(anchors[0]);
    this.physics.setAnchors(anchors);
  }
  ngOnDestroy(): void {
    window.removeEventListener('pointerup', this.physics.pointerup);
    window.removeEventListener('pointermove', this.physics.pointerMoved);
    window.addEventListener('pointercancel', this.physics.pointerup);
  }
  getTransitionValue(start: number, end: number) {
    return start + (end - start) * this.getKeyFrame();
  }
  getScale() {
    let scale = this.getTransitionValue(this.minified_scale, this.max_scale);
    return scale;
  }
  getOverlayPointerEvents() {
    return this.site.getSnapped() ? 'none' : 'auto';
  }

  setDelta(timestamp: number) {
    let delta = timestamp - this.timestamp;
    this.timestamp = timestamp;
    return delta / 1000;
  }

  private timestamp = 0;
  tick = (time: number) => {
    this.physics.tick(time);
    let delta = this.setDelta(time);
    this.incrementAnimation(delta);
    this.checkSelectedIndex();
    requestAnimationFrame(this.tick);
  };
  getOpacity() {
    if (!this.physics.isSelected()) return 0.7;
    return 0;
  }

  getSideLength() {
    return this.side_length;
  }
  getIconLength() {
    // return this.getSideLength() + 2 * (this.padding + this.border);
    return this.getSideLength();
  }
  getMinifiedIconLength() {
    // return (
    //   (this.getSideLength() + 2 * (this.padding + this.border)) *
    //   this.minified_scale
    // );
    return this.minified_side_length;
  }
  getPadding() {
    return this.padding;
  }
  getBorder() {
    return this.border;
  }
  getOffset = () => this.physics.getOffset();
  getData() {
    return this.site.projects;
  }
  getAnchors() {
    let data = this.getData();
    let lefts = data.map(
      (val: any, index: number) => index * this.getIconLength()
    );
    let anchors = lefts.map((x_coord) => -(x_coord + this.getIconLength() / 2));
    return anchors;
  }

  pointerdown = (event: PointerEvent) => this.physics.pointerdown(event);
  scrolled = (event: WheelEvent) => this.physics.scrolled(event);

  getContentWidth() {
    let num = this.getData().length;
    let length = num * this.getIconLength();
    return length;
  }
  getLeftScrollLimit() {
    let center = this.getCenter();
    let zero_left = center - this.getIconLength() / 2;
    return zero_left;
  }
  getRightScrollLimit() {
    let length = this.getContentWidth();
    let center = this.getCenter();
    let zero_right = center + this.getIconLength() / 2;
    let result = zero_right - length;
    return result;
  }

  getCenter() {
    return this.getContainerWidth() / 2;
  }
  getBodyCenter() {
    return document.body.offsetWidth / 2;
  }
  getContainerWidth() {
    return this.container?.nativeElement?.offsetWidth ?? 0;
  }

  getScrollX() {
    return this.getCenter() - this.physics.getOffset();
  }
  setScrollX(x_coord: number) {
    this.physics.setOffset(x_coord);
  }
  private current_index: number | null = null;
  checkSelectedIndex() {
    let index = this.getSelectedIndex();
    if (
      index > -1 &&
      this.current_index !== index &&
      this.physics.isSelected()
    ) {
      this.current_index = index;
      this.selection.emit(this.current_index);
      this.setBG();
    }
  }
  isSelected = () => this.physics.isSelected();
  getSelectedIndex() {
    let scroll_coord = this.physics.getOffset();
    let anchors = this.getAnchors();
    let index = anchors.findIndex((anchor) => anchor === scroll_coord);
    return index;
  }

  getScrollDist(index: number) {
    let scroll_x = this.physics.getOffset();
    let index_x = index * this.getIconLength() + this.getIconLength() / 2;
    return index_x + scroll_x;
  }
  getIconLeft(index: number) {
    return this.getCenter() + index * this.getIconLength() + this.getOffset();
  }
  getTranslate(dist: number) {
    let x = `${this.getTranslateX(dist)}px`;
    let y = `${this.getTranslateY()}px`;
    let z = `${this.getTranslateZ(dist)}px`;
    // return `translate3d(${x}, 0px, ${z})`;
    return `translate3d(${x}, ${y}, ${z})`;
  }
  getTranslateX(dist: number) {
    let result = 0;
    if (Math.abs(dist) > this.margin) result += Math.sign(dist) * this.margin;
    else result += dist;
    result -= dist * (1 - this.getScale());
    return result;
  }
  getBottom() {
    return -(this.getIconLength() / 2) * (1 - this.getScale());
  }
  getTranslateY() {
    let result = 0;
    result += this.scrolling_y_offset * this.getKeyFrame();
    // result += this.getIconLength();
    // result += (this.getIconLength() / 2) * (1 - this.getScale());
    return -1 * result;
  }
  getTranslateZ(dist: number) {
    return -this.getK() * Math.pow(dist, 2) * this.getKeyFrame();
  }
  getK() {
    // somewhat arbitrary value for excess, but I like it
    let excess = this.margin + this.getIconLength();
    let k = this.perspective / Math.pow(this.getContainerWidth() - excess, 2);
    return k;
  }
  getFilter(index: number) {
    let dist = this.getScrollDist(index);
    let z = Math.abs(this.getTranslateZ(dist));
    let blur = z / 100;
    return `blur(${blur}px)`;
  }
  getZIndex(index: number) {
    let dist = Math.abs(this.getScrollDist(index));
    return -Math.round(dist);
  }
  getTransform(index: number) {
    let dist = this.getScrollDist(index);
    // let scale = this.physics.isSelected() ? `scale(${this.getScale()})` : '';
    let scale = `scale(${this.getScale()})`;
    return `${this.getTranslate(dist)} ${scale}`;
  }
  getMiddleTransform() {
    let scale = `scale(${this.getScale()})`;
    let y = `translateY(${this.getTranslateY()}px)`;
    // return `${this.getTranslate(dist)} ${scale}`;
    return `${y} ${scale}`;
  }

  getDescriptionLeft(index: number) {
    let dist = this.getScrollDist(index);
    let centered =
      this.getBodyCenter() +
      index * this.getIconLength() +
      this.getOffset() -
      (this.getDescriptionWidth() - this.getIconLength()) / 2;
    let offset = this.getXOffsetDescription(index);
    return centered + offset;
  }
  private description_scale = 0.8;
  getDescriptionScale() {
    return this.description_scale;
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
    let icon_bottom = -this.getTranslateY();
    let icon_height = this.getIconLength();
    let available_height =
      document.body.offsetHeight - icon_bottom - icon_height;
    return available_height;
  }
  getAvailableDescriptionWidth() {
    return document.body.offsetWidth;
  }
  getDescriptionBottom(index: number) {
    let available_height = this.getAvailableDescriptionHeight();
    let icon_top = this.getIconLength() - this.getTranslateY();
    let remaining_to_center =
      (available_height - this.getDescriptionHeight()) / 2;
    let gap = Math.max(15, remaining_to_center * 0.3);
    let centered_bottom = icon_top + gap;
    let adjustment = Math.pow(Math.abs(this.getScrollDist(index)), 2) / 300;
    return centered_bottom + adjustment;
  }
  getXOffsetDescription(index: number) {
    let speed_factor = this.getDescriptionWidth() / this.getIconLength();
    return this.getScrollDist(index) * speed_factor;
  }
}
