import { Component, OnDestroy, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'sh-navbar-two',
  templateUrl: './navbar-two.component.html',
  styleUrls: ['./navbar-two.component.scss'],
})
export class NavbarTwoComponent implements OnInit, OnDestroy {
  private side_length = 40;
  private padding = 10;
  private border = 1;
  private offset = 0;
  private velocity = 0;
  private damping = 0.88;

  private dragstart: number | null = null;

  private lastMouseMove: PointerEvent | null = null;

  constructor(private site: SiteService) {}

  ngOnInit(): void {
    requestAnimationFrame(this.tick);
    window.addEventListener('pointerup', this.pointerup);
    window.addEventListener('pointermove', this.pointermove);
  }
  ngOnDestroy(): void {
    window.removeEventListener('pointerup', this.pointerup);
    window.removeEventListener('pointermove', this.pointermove);
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

  setMouseEvent(event: PointerEvent) {}

  pointerdown(event: PointerEvent) {
    // this.setMouseEvent(event);
    // this.mouseEvent = event;
    this.dragstart = event.clientX - this.offset;
  }
  pointermove = (event: PointerEvent) => {
    // this.setMouseEvent(event);
    this.lastMouseMove = event;
    if (this.dragstart !== null) {
      // console.log(this.dragstart);
      this.offset = event.clientX - this.dragstart;
    }
  };
  pointerup = (event: PointerEvent) => {
    // this.setMouseEvent(event);
    this.setVelocity(event);
    this.dragstart = null;
    // console.log('window mouseup, dragstart: ' + this.dragstart);
  };
  rightdown(event: Event) {
    console.log(event);
    this.velocity += 10;
  }
  leftdown(event: Event) {
    console.log(event);
    this.velocity -= 10;
  }

  // setVelocity() {
  //   console.log(this.mouseEvent);
  //   console.log(this.prevMouseEvent);
  //   let x1 = this.mouseEvent?.clientX ?? 0;
  //   let x2 = this.prevMouseEvent?.clientX ?? 0;
  //   let result = x1 - x2;
  //   this.velocity = result;
  //   console.log(this.velocity);
  //   this.tickVelocity(null);
  // }
  setVelocity = (mouseup: PointerEvent) => {
    // if (this.lastMouseMove) {
    // let delta_t = mouseup.timeStamp - (this.lastMouseMove?.timeStamp ?? 0);
    // console.log('delta_t: ' + delta_t);
    let delta_x = this.lastMouseMove?.movementX ?? 0;
    // console.log('delta_x: ' + delta_x);
    let v = delta_x;
    this.velocity = v;
    // this.tickVelocity(null);
    // console.log(v);
    // }
  };
  private timestamp = 0;
  tick = (time: any) => {
    // console.log('time: ' + time);
    console.log('velocity: ' + this.velocity);
    console.log('offset: ' + this.offset);

    if (this?.velocity ?? 0 !== 0) {
      let delta = 0;
      if (time) delta = time - this.timestamp;
      // console.log('delta: ' + delta);
      this.timestamp = time;
      // this.offset += Math.floor((this.velocity * delta) / 1000);
      this.offset += this.velocity;
      this.velocity *= this.damping;
      if (Math.abs(this.velocity) < 0.1) this.velocity = 0;
      // console.log(this.velocity);
    }
    requestAnimationFrame(this.tick);
  };
}
