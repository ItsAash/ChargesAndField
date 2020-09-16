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

    this.prevPath = [];

    //
    this.maxCharge = 1;
    this.remarks =
      "The field lines change in form of an approximate circle around the point charge as it moves.";
  }

  updateMaths() {
    this.maths = `Angular Velocity (ω) = ${this.aVel * 60} radians per sec`;
    document.getElementById("remarks__here").innerHTML = this.remarks;
    document.getElementById("maths__here").innerHTML = this.maths;
  }

  init() {
    this.update();
    this.revolve();
    this.updateMaths();
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
    this.prevPath.push(pointToBeRotated);
    const newPos = createVector(x1, y1);
    this.charge.pos = newPos;
    noFill();
    ellipse(this.originPoint.x, this.originPoint.y, this.radius * 2);
    this.aVel = 0;
  }
}
