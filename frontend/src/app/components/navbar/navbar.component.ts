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

  private side_length = 40;
  private padding = 10;
  private minified_scale = 0.4;
  private max_scale = 1;
  private animation_timing_x = 0;
  private timing_function = bezier(0.79, 0.09, 0.25, 1);
  getKeyFrame() {
    return this.timing_function(this.animation_timing_x);
  }
  private animation_seconds = 0.2;
  incrementAnimation(delta: number) {
    let direction = !this.physics.isSelected();
    let result;
    if (direction) {
      result = this.animation_timing_x + delta / this.animation_seconds;
    } else result = this.animation_timing_x - delta / this.animation_seconds;
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
    this.physics.tick();
    let delta = this.setDelta(time);
    this.incrementAnimation(delta);
    this.checkSelectedIndex();
    requestAnimationFrame(this.tick);
  };
  // getMousedown = () => this.site.getMousedown();
  getOpacity() {
    if (!this.physics.isSelected())
      // if (this.site.getMousedown() || this.physics.getVelocity() !== 0)
      return 0.7;
    return 0;
  }

  getSideLength() {
    return this.side_length;
  }
  getIconLength() {
    return this.getSideLength() + 2 * (this.padding + this.border);
  }
  getMinifiedIconLength() {
    return (
      (this.getSideLength() + 2 * (this.padding + this.border)) *
      this.minified_scale
    );
  }
  getPadding() {
    return this.padding;
  }
  getBorder() {
    return this.border;
  }
  getOffset = () => this.physics.getOffset();
  getData() {
    return this.site.getTestData();
  }
  getAnchors() {
    let data = this.getData();
    let lefts = data.map(
      (val: string, index: number) => index * this.getIconLength()
    );
    let anchors = lefts.map((x_coord) => -(x_coord + this.getIconLength() / 2));
    return anchors;
  }

  pointerdown = (event: PointerEvent) => this.physics.pointerdown(event);
  scrolled = (event: WheelEvent) => this.physics.scrolled(event);

  getContentWidth() {
    let num = this.site.getTestData().length;
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
    }
  }
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
  getMiddleScrollDist() {
    let scroll_x = this.physics.getOffset() + this.getIconLength() / 2;
    // let index_x = index * this.getIconLength() + this.getIconLength() / 2;
    // return index_x + scroll_x;
    return scroll_x;
  }
  getTranslate(dist: number) {
    // let x = `translateX(${this.getTranslateX(dist)}px)`;
    // let y = `translateY(${this.getTranslateY(dist)}px)`;
    // let z = `translateZ(${this.getTranslateZ(dist)}px)`;
    let x = `${this.getTranslateX(dist)}px`;
    let y = `${this.getTranslateY(dist)}px`;
    let z = `${this.getTranslateZ(dist)}px`;
    // return `${x} ${z}`;
    return `translate3d(${x}, ${y}, ${z})`;
  }
  private margin = this.padding;
  getTranslateX(dist: number) {
    let result = 0;
    if (Math.abs(dist) > this.margin) result += Math.sign(dist) * this.margin;
    else result += dist;
    result -= dist * (1 - this.getScale());
    return result;
  }
  getTranslateY(dist: number) {
    // let result = (100 - Math.pow(Math.abs(dist), 0.1)) * this.animation_scale;
    // let result = (100 - Math.pow(Math.abs(dist), 0.1)) * this.animation_scale;
    let result = 100 * this.getKeyFrame();
    result += (this.getIconLength() / 2) * (1 - this.getScale());
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
    let y = `translateY(${this.getTranslateY(0)}px)`;
    // return `${this.getTranslate(dist)} ${scale}`;
    return `${y} ${scale}`;
  }
}
