import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavbarPhysics } from 'src/app/helpers/navbar-physics';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'sh-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  private side_length = 40;
  private padding = 10;
  private border = 1;
  private perspective = 500;
  getPerspective() {
    return this.perspective;
  }

  private physics: NavbarPhysics = new NavbarPhysics();

  constructor(private site: SiteService) {}

  ngOnInit(): void {
    // requestAnimationFrame(this.tick);
    requestAnimationFrame(this.physics.tick);
    document.addEventListener('pointerup', this.physics.pointerup);
    document.addEventListener('pointermove', this.physics.pointerMoved);
  }
  ngAfterViewInit(): void {
    let anchors = this.getAnchors();
    this.setScrollX(anchors[0]);
    this.physics.setAnchors(anchors);
  }
  ngOnDestroy(): void {
    document.removeEventListener('pointerup', this.physics.pointerup);
    document.removeEventListener('pointermove', this.physics.pointerMoved);
  }

  getSideLength() {
    return this.side_length;
  }
  getIconLength() {
    return this.side_length + 2 * (this.padding + this.border);
  }
  getPadding() {
    return this.padding;
  }
  getBorder() {
    return this.border;
  }
  // getOffset() {
  //   return this.physics.getOffset();
  // }
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
    // console.log(anchors);
    return anchors;
  }

  // queuePointerMove(event: PointerEvent | null) {
  //   this.currentMouseMove = event;
  // }
  // tickPointer() {
  //   this.lastMouseTick = this.currentMouseTick;
  //   this.currentMouseTick = this.currentMouseMove;
  // }

  pointerdown = (event: PointerEvent) => this.physics.pointerdown(event);
  scrolled = (event: WheelEvent) => this.physics.scrolled(event);

  getDelta(t1: number, t2: number) {
    let delta_ms = t2 - t1;
    let delta_s = delta_ms / 1000;
    return delta_s;
  }

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

  getLeftOverscroll() {
    let center = this.getCenter();
    let zero_left = center - this.getIconLength() / 2;
    let result = zero_left - this.physics.getOffset();
    return result;
  }
  getRightOverscroll() {
    let num = this.site.getTestData().length;
    let length = num * this.getIconLength();
    let center = this.getCenter();
    let zero_right = center + this.getIconLength() / 2;
    let result = zero_right - (this.physics.getOffset() + length);
    return result;
  }
  getOverscroll() {
    let left = this.getLeftOverscroll();
    if (left < 0) return left;
    let right = this.getRightOverscroll();
    if (right > 0) return right;
    return 0;
  }
  getPointOverscroll(x_coord: number) {
    let center = this.getCenter();
    let normalized = center - x_coord;
    let dist = normalized - this.physics.getOffset();
    return dist;
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
  getSelectedIndex() {
    let scroll_coord = this.physics.getOffset();
    let anchors = this.getAnchors();
    let index = anchors.findIndex((anchor) => anchor === scroll_coord);
    // console.log(index);
  }

  getScrollDist(index: number) {
    let scroll_x = this.physics.getOffset();
    let index_x = index * this.getIconLength() + this.getIconLength() / 2;
    return index_x + scroll_x;
  }
  getTranslate(dist: number) {
    let z = `translateZ(${this.getTranslateZ(dist)}px)`;
    let x = `translateX(${this.getTranslateX(dist)}px)`;
    return `${x} ${z}`;
  }
  getTranslateZ(dist: number) {
    // return (-Math.pow(dist, 2) / this.getContainerWidth()) * 2;
    return -this.getK() * Math.pow(dist, 2);
    // return -Math.abs(dist);
  }
  getK() {
    // somewhat arbitrary value for excess, but I like it
    let excess = this.margin + this.getIconLength();
    let k = this.perspective / Math.pow(this.getContainerWidth() - excess, 2);
    return k;
  }
  private margin = this.padding;
  getTranslateX(dist: number) {
    if (Math.abs(dist) > this.margin) return Math.sign(dist) * this.margin;
    else return dist;
  }
  getFilter(index: number) {
    let dist = this.getScrollDist(index);
    let z = Math.abs(this.getTranslateZ(dist));
    let blur = z / 100;
    return `blur(${blur}px)`;
    // if (Math.abs(dist) > this.margin) return `blur(${blur}px)`;
    // return '';
  }
  getZ(index: number) {
    let dist = Math.abs(this.getScrollDist(index));
    return -Math.round(dist);
  }
  getTransform(index: number) {
    let dist = this.getScrollDist(index);
    return `${this.getTranslate(dist)}`;
  }
}
