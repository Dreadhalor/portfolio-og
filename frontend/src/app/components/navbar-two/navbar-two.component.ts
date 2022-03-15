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
  private damping = 0.95;
  private c = 0.2;

  private dragstart: number | null = null;

  private lastMouseMove: PointerEvent | null = null;
  private currentMouseMove: PointerEvent | null = null;

  private currentMouseTick: PointerEvent | null = null;
  private lastMouseTick: PointerEvent | null = null;

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

  queuePointerMove(event: PointerEvent) {
    this.lastMouseMove = this.currentMouseMove;
    // this.lastMouse = this.currentMouse;
    this.currentMouseMove = event;
    // this.currentMouse = event;
  }
  tickPointer() {
    this.lastMouseTick = this.currentMouseTick;
    this.currentMouseTick = this.currentMouseMove;
    console.log('tickDX: ' + this.getTickDX());
  }
  tickPointerMove() {
    this.lastMouseMove = this.currentMouseMove;
    this.currentMouseMove = null;
  }
  resetPointerMoves() {
    this.lastMouseMove = null;
    this.currentMouseMove = null;
  }

  pointerdown(event: PointerEvent) {
    // this.setMouseEvent(event);
    // this.mouseEvent = event;
    this.dragstart = event.clientX - this.offset;
    this.velocity = 0;
  }
  pointermove = (event: PointerEvent) => {
    // this.setMouseEvent(event);
    if (this.dragstart !== null) {
      // console.log(event.getCoalescedEvents());
      // console.log(this.dragstart);
      this.queuePointerMove(event);
      this.offset = event.clientX - this.dragstart;
      // console.log('offset: ' + this.offset);
    }
    // else this.lastMouseMove = null;
  };
  pointerup = (event: PointerEvent) => {
    // this.setMouseEvent(event);
    this.setVelocity(event);
    this.resetPointerMoves();
    this.dragstart = null;
    console.log('window mouseup, dragstart: ' + this.dragstart);
  };

  setVelocity = (mouseup: PointerEvent) => {
    this.velocity = this.calculateTickVelocity();
  };
  calculateTickVelocity() {
    if (!this.currentMouseTick || !this.lastMouseTick) return 0;
    if (this.currentMouseTick === this.lastMouseTick) return 0;
    let dx = this.getTickDX();
    // console.log('dx: ' + dx);
    let dt = this.getTickDT();
    // console.log('dt: ' + dt);
    let v = dx;
    // console.log('v: ' + v);
    return v;
  }
  getTickDX() {
    if (this.currentMouseTick && this.lastMouseTick) {
      let x1 = this.currentMouseTick?.clientX;
      let x2 = this.lastMouseTick?.clientX;
      return Math.round(x1 - x2);
    }
    return 0;
  }
  getTickDT() {
    if (this.currentMouseTick && this.lastMouseTick) {
      let t1 = this.currentMouseTick?.timeStamp;
      let t2 = this.lastMouseTick?.timeStamp;
      return (t1 - t2) / 100;
    }
    return 1;
  }
  calculateVelocity() {
    if (!this.currentMouseMove || !this.lastMouseMove) return 0;
    if (this.currentMouseMove === this.lastMouseMove) return 0;
    let dx = this.getDX();
    console.log('dx: ' + dx);
    let dt = this.getDT();
    console.log('dt: ' + dt);
    let v = dx;
    console.log('v: ' + v);
    return v;
  }
  getDX() {
    if (this.currentMouseMove && this.lastMouseMove) {
      let x1 = this.currentMouseMove?.clientX;
      let x2 = this.lastMouseMove?.clientX;
      return x1 - x2;
    }
    return 0;
  }
  getDT() {
    if (this.currentMouseMove && this.lastMouseMove) {
      let t1 = this.currentMouseMove?.timeStamp;
      let t2 = this.lastMouseMove?.timeStamp;
      return (t1 - t2) / 300;
    }
    return 1;
  }
  private timestamp = 0;

  getDelta(t1: number, t2: number) {
    let delta_ms = t2 - t1;
    // console.log(delta_ms);
    let delta_s = delta_ms / 1000;
    // console.log(delta_s);
    return delta_s;
  }

  tickAcceleration() {}
  tickVelocity = (delta: number) => {
    let absolute_dv = this.velocity * this.c;
    let tick_dv = absolute_dv * delta;
    this.velocity -= tick_dv;
  };
  tickPosition = (delta: number) => {
    let tick_dx = this.velocity * delta;
    this.offset += tick_dx;
  };

  tick = (time: number) => {
    // console.log('time: ' + time);
    // console.log('velocity: ' + this.velocity);
    // console.log('offset: ' + this.offset);
    this.tickPointer();
    if (this.velocity !== 0) {
      let delta = this.getDelta(this.timestamp, time);
      // console.log('new delta: ' + delta);
      this.timestamp = time;
      // this.tickVelocity(delta);
      // this.tickPosition(delta);

      // let dv = this.velocity * this.c * delta;
      // this.velocity -= dv;

      // this.offset += Math.floor((this.velocity * delta) / 1000);
      this.offset += this.velocity;
      // this.offset += this.velocity;
      // console.log(this.offset);
      // this.velocity *= this.damping * delta;
      this.velocity *= this.damping;
      if (Math.abs(this.velocity) < 0.1) this.velocity = 0;
      // console.log('tick-end velocity: ' + this.velocity);
    }
    // this.tickPointerMove();
    requestAnimationFrame(this.tick);
  };
}
