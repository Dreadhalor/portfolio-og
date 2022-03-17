import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'sh-navbar-two',
  templateUrl: './navbar-two.component.html',
  styleUrls: ['./navbar-two.component.scss'],
})
export class NavbarTwoComponent implements OnInit, OnDestroy {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  private side_length = 40;
  private padding = 10;
  private border = 1;
  private offset = 0;
  private velocity = 0;
  private velocity_limit = 100;
  private velocity_zero_limit = 0.1;
  private velocity_snap_limit = 1;
  private acceleration = 0;
  private damping = 0.97;

  private dragstart: number | null = null;

  private currentMouseMove: PointerEvent | null = null;
  private currentMouseTick: PointerEvent | null = null;
  private lastMouseTick: PointerEvent | null = null;

  private snapping = false;

  constructor(private site: SiteService) {}

  ngOnInit(): void {
    requestAnimationFrame(this.tick);
    document.addEventListener('pointerup', this.pointerup);
    document.addEventListener('pointermove', this.pointermove);
  }
  ngOnDestroy(): void {
    document.removeEventListener('pointerup', this.pointerup);
    document.removeEventListener('pointermove', this.pointermove);
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
  getOffset() {
    return this.offset;
  }
  getData() {
    return this.site.getTestData();
  }
  getAnchors() {
    let data = this.getData();
    let lefts = data.map(
      (val: string, index: number) => index * this.getIconLength()
    );
    let anchors = lefts.map((x_coord) => x_coord + this.getIconLength() / 2);
    // console.log(anchors);
    return anchors;
  }

  queuePointerMove(event: PointerEvent | null) {
    this.currentMouseMove = event;
  }
  tickPointer() {
    this.lastMouseTick = this.currentMouseTick;
    this.currentMouseTick = this.currentMouseMove;
  }

  pointerdown(event: PointerEvent) {
    this.dragstart = event.clientX - this.offset;
    this.velocity = 0;
  }
  pointermove = (event: PointerEvent) => {
    if (this.dragstart !== null) {
      this.queuePointerMove(event);
      this.offset = event.clientX - this.dragstart;
    }
  };
  pointerup = (event: PointerEvent) => {
    this.setVelocity(event);
    this.queuePointerMove(null);
    this.dragstart = null;
  };

  setVelocity = (mouseup: PointerEvent) => {
    this.velocity = this.calculateTickVelocity();
  };
  calculateTickVelocity() {
    if (!this.currentMouseTick || !this.lastMouseTick) return 0;
    if (this.currentMouseTick === this.lastMouseTick) return 0;
    let dx = this.getTickDX();
    // let dt = this.getTickDT();
    // let v = dx / dt;
    let v = this.constrainAbsoluteValue(dx, this.velocity_limit, -1);
    return v;
  }
  getTickDX() {
    if (this.currentMouseTick && this.lastMouseTick) {
      let x1 = this.currentMouseTick?.clientX;
      let x2 = this.lastMouseTick?.clientX;
      return x1 - x2;
    }
    return 0;
  }
  getTickDT() {
    if (this.currentMouseTick && this.lastMouseTick) {
      let t1 = this.currentMouseTick?.timeStamp;
      let t2 = this.lastMouseTick?.timeStamp;
      // console.log(t1);
      // console.log(t2);
      // console.log('----');
      return (t1 - t2) / 1000;
    }
    return 1;
  }

  getDelta(t1: number, t2: number) {
    let delta_ms = t2 - t1;
    let delta_s = delta_ms / 1000;
    return delta_s;
  }

  getLeftScrollLimit() {
    let center = this.getCenter();
    let zero_left = center - this.getIconLength() / 2;
    return zero_left;
  }
  getRightScrollLimit() {
    let num = this.site.getTestData().length;
    let length = num * this.getIconLength();
    let center = this.getCenter();
    let zero_right = center + this.getIconLength() / 2;
    let result = zero_right - length;
    return result;
  }
  getOverscroll() {
    let num = this.site.getTestData().length;
    let length = num * this.getIconLength();
    // let body_len = this.getContainerWidth();
    // let zero_left = (body_len - this.getIconLength()) / 2;
    // let zero_right = (body_len + this.getIconLength()) / 2;
    let center = this.getCenter();
    let zero_left = center - this.getIconLength() / 2;
    let zero_right = center + this.getIconLength() / 2;
    let result = zero_left - this.offset;
    let result_2 = zero_right - (this.offset + length);
    // console.log(result + ', ' + result_2);
    return [result, result_2];
    // return result;
  }
  getLeftOverscroll() {
    let center = this.getCenter();
    let zero_left = center - this.getIconLength() / 2;
    let result = zero_left - this.offset;
    return result;
  }
  getRightOverscroll() {
    let num = this.site.getTestData().length;
    let length = num * this.getIconLength();
    let center = this.getCenter();
    let zero_right = center + this.getIconLength() / 2;
    let result = zero_right - (this.offset + length);
    return result;
  }
  getOverscroll2() {
    let left = this.getLeftOverscroll();
    if (left < 0) return left;
    let right = this.getRightOverscroll();
    if (right > 0) return right;
    return 0;
  }
  getPointOverscroll(x_coord: number) {
    let center = this.getCenter();
    let normalized = center - x_coord;
    let dist = normalized - this.offset;
    return dist;
  }
  getBackgroundColor() {
    let [left_overscroll, right_overscroll] = this.getOverscroll();
    if (left_overscroll < 0 || right_overscroll > 0) return 'rgb(255,100,100)';
    return 'rgb(150,150,255)';
  }
  getCenter() {
    return this.getContainerWidth() / 2;
  }
  getContainerWidth() {
    return this.container?.nativeElement?.offsetWidth ?? 0;
  }
  constrainAbsoluteValue(value: number, constraint: number, direction: number) {
    if (direction > 0 && Math.abs(value) < constraint)
      return Math.sign(value) * constraint;
    if (direction < 0 && Math.abs(value) > constraint)
      return Math.sign(value) * constraint;
    return value;
  }

  tickAcceleration = () => {
    let overscroll = this.getOverscroll2();
    // console.log(overscroll);
    this.acceleration += this.constrainAbsoluteValue(overscroll / 20, 1, 1);
  };
  tickVelocity = () => {
    this.velocity *= this.damping;
    this.velocity += this.acceleration;
  };
  tickPosition = () => {
    let pre_overscroll = this.getOverscroll2();
    this.offset += this.velocity;
    let post_overscroll = this.getOverscroll2();
    if (pre_overscroll !== post_overscroll && post_overscroll === 0) {
      this.velocity = 0;
      this.offset =
        pre_overscroll < 0
          ? this.getLeftScrollLimit()
          : this.getRightScrollLimit();
    }
    this.acceleration = 0;
  };
  // private timestamp = 0;
  getScrollX() {
    return this.getCenter() - this.offset;
  }
  setScrollX(x_coord: number) {
    this.offset = this.getCenter() - x_coord;
  }
  getNearestAnchor() {
    let x = this.getScrollX();
    let anchors = this.getAnchors();
    let distances = anchors.map((anchor, index) => [
      Math.abs(anchor - x),
      index,
    ]);
    distances.sort((a, b) => a[0] - b[0]);
    return anchors[distances[0][1]];
  }
  tickSnapTo(x_coord: number) {
    let overscroll = this.getPointOverscroll(x_coord);
    // console.log(overscroll);
    this.acceleration += this.constrainAbsoluteValue(overscroll / 20, 1, 1);
  }
  tick = (time: number) => {
    // console.log(this.getPointOverscroll(anchor));
    // this.tickSnapTo(anchor);

    this.tickPointer();
    if (!this.dragstart) {
      if (this.snapping || Math.abs(this.velocity) < this.velocity_snap_limit) {
        let anchor = this.getNearestAnchor();
        console.log(anchor);
        this.tickSnapTo(anchor);
        this.snapping = true;
        // this.velocity = 0;
      }

      // let delta = this.getDelta(this.timestamp, time);
      // this.timestamp = time;
      this.tickAcceleration();
      this.tickVelocity();
      this.tickPosition();
      // this.velocity *= this.damping;
      // this.offset += this.velocity;
      if (
        this.velocity !== 0 &&
        Math.abs(this.velocity) < this.velocity_zero_limit
      )
        this.velocity = 0;
    }
    this.getOverscroll();
    requestAnimationFrame(this.tick);
  };
}
