class CircularMode {
  constructor(charge, aVelocity, radius) {
    this.charge = charge;
    this.aVel = aVelocity;
    this.radius = radius;

    this.angle = 0;

    this.originPoint = {
      x: charge.pos.x + this.radius,
      y: charge.pos.y,
    };
  }

  init() {
    this.update();
    this.revolve();
    console.log(this.aVel);
  }

  update() {
    this.angle += this.aVel;
  }

  revolve() {
    // angleMode(DEGREES);
    const pointToBeRotated = this.charge.pos;
    const coordinatesOfCenterOfRotation = this.originPoint;
    const angleToBeRotated = this.angle;

    const x1 =
      (pointToBeRotated.x - coordinatesOfCenterOfRotation.x) *
        cos(angleToBeRotated) -
      (pointToBeRotated.y - coordinatesOfCenterOfRotation.y) *
        sin(angleToBeRotated) +
      coordinatesOfCenterOfRotation.x;
    const y1 =
      (pointToBeRotated.x - coordinatesOfCenterOfRotation.x) *
        sin(angleToBeRotated) +
      (pointToBeRotated.y - coordinatesOfCenterOfRotation.y) *
        cos(angleToBeRotated) +
      coordinatesOfCenterOfRotation.y;

    const newPos = createVector(x1, y1);
    this.charge.pos = newPos;
    this.aVel = 0;
  }
}
