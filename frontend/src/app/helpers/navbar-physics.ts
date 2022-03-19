export enum PhysicsState {
  POINTERCONTROL,
  FREEFALL,
  // OVERSCROLLED,
  SNAPPING,
  SNAPPED,
}

export class NavbarPhysics {
  //constants
  private velocity_limit = 100;
  private velocity_zero_limit = 0;
  private velocity_snap_start_limit = 5;
  private velocity_snap_end_limit = 3;
  private snap_factor = 0.02;
  private damping = 0.97;

  //metadata
  private state = PhysicsState.FREEFALL;
  getState() {
    return this.state;
  }
  checkState() {
    if (this.state === PhysicsState.FREEFALL) {
      if (Math.abs(this.velocity) <= this.velocity_snap_start_limit)
        this.state = PhysicsState.SNAPPING;
    }
  }
  private dragstart: number | null = null;
  private currentMouseMove: PointerEvent | null = null;
  private currentMouseTick: PointerEvent | null = null;
  private lastMouseTick: PointerEvent | null = null;

  //variables
  private acceleration = 0;
  private velocity = 0;
  private offset = 0;
  getOffset() {
    return this.offset;
  }
  setOffset(x_coord: number) {
    this.offset = x_coord;
  }

  //anchors
  private anchors: number[] = [];
  setAnchors(anchors: number[]) {
    this.anchors = anchors;
  }
  getNearestAnchor() {
    let x = this.offset;
    let anchors = this.anchors;
    let distances = anchors.map((anchor, index) => [
      Math.abs(anchor - x),
      index,
    ]);
    distances.sort((a, b) => a[0] - b[0]);
    return anchors[distances[0][1]];
  }

  constructor() {}

  move(offset: number) {
    this.offset += offset;
  }
  scrolled = (event: WheelEvent) => {
    this.state = PhysicsState.SNAPPING;
    let dx = -event.deltaX;
    let dy = -event.deltaY;
    let selected_delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    this.velocity = 0;
    this.move(selected_delta);
  };
  pointerdown(event: PointerEvent) {
    console.log('pointer');
    this.state = PhysicsState.POINTERCONTROL;
    this.dragstart = event.clientX - this.offset;
    this.velocity = 0;
  }
  pointerup = () => {
    if (this.dragstart !== null) {
      this.state = PhysicsState.FREEFALL;
      this.setVelocity();
    }
    this.registerPointerMove(null);
    this.dragstart = null;
  };
  pointerMoved = (event: PointerEvent) => {
    this.registerPointerMove(event);
    // console.log(this.dragstart);
    if (this.dragstart !== null) {
      // this.move(event.movementX);
      this.offset = event.clientX - this.dragstart;
    }
  };
  registerPointerMove(event: PointerEvent | null) {
    this.currentMouseMove = event;
  }

  tick = (time: number) => {
    this.tickPointer();
    this.checkState();
    switch (this.state) {
      case PhysicsState.SNAPPING: {
        let anchor = this.getNearestAnchor();
        this.acceleration = (anchor - this.offset) * this.snap_factor;
        break;
      }
    }
    this.tickVelocity();
    this.tickPosition();
    requestAnimationFrame(this.tick);
  };

  tickPointer() {
    this.lastMouseTick = this.currentMouseTick;
    this.currentMouseTick = this.currentMouseMove;
  }
  tickVelocity = () => {
    this.velocity *= this.damping;
    this.velocity += this.acceleration;
    if (
      this.velocity !== 0 &&
      Math.abs(this.velocity) <= this.velocity_zero_limit
    )
      this.velocity = 0;
    this.acceleration = 0;
  };
  tickPosition = () => {
    if (this.state === PhysicsState.SNAPPING) {
      let anchor = this.getNearestAnchor();
      let pre_dist = anchor - this.offset;
      let possible_offset = this.offset + this.velocity;
      let post_dist = anchor - possible_offset;
      if (Math.sign(pre_dist) !== Math.sign(post_dist)) {
        let dist = Math.abs(post_dist);
        if (dist < this.velocity_snap_end_limit) {
          this.offset = anchor;
          this.velocity = 0;
          this.state = PhysicsState.SNAPPED;
          return;
        }
      }
    }
    // let pre_overscroll = this.getOverscroll2();
    this.offset += this.velocity;
    // let post_overscroll = this.getOverscroll2();
    // if (pre_overscroll !== post_overscroll && post_overscroll === 0) {
    //   this.velocity = 0;
    //   this.offset =
    //     pre_overscroll < 0
    //       ? this.getLeftScrollLimit()
    //       : this.getRightScrollLimit();
    // }
  };

  setVelocity = () => {
    if (this.dragstart !== null) this.velocity = this.calculateTickVelocity();
  };
  calculateTickVelocity() {
    if (!this.currentMouseTick || !this.lastMouseTick) return 0;
    if (this.currentMouseTick === this.lastMouseTick) return 0;
    let dx = this.getTickDX();
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

  constrainAbsoluteValue(value: number, constraint: number, direction: number) {
    if (direction > 0 && Math.abs(value) < constraint)
      return Math.sign(value) * constraint;
    if (direction < 0 && Math.abs(value) > constraint)
      return Math.sign(value) * constraint;
    return value;
  }
}
