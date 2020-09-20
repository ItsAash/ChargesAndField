class CircularMode {
  constructor(charge, aVelocity, radius) {
    this.charge = charge;
    this.aVel = aVelocity;
    this.aVelFixed = aVelocity;
    this.radius = radius;

    this.angle = 0;

    this.originPoint = {
      x: charge.pos.x + this.radius,
      y: charge.pos.y,
    };

    this.remarks =
      "The field lines change in form of an approximate circle around the point charge as it moves.";

    this.deleted = false;
  }

  updateMaths() {
    this.maths = `Angular Velocity (ω) = ${(() => {
      return floor(this.aVelFixed * 60);
    })()} radians per sec`;
    document.getElementById("maths__here").innerHTML = this.maths;

    document.getElementById("remarks__here").innerHTML = this.remarks;
  }

  init() {
    this.updateMaths();
    this.update();
    this.revolve();
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
    noFill();
    this.aVel = 0;
    if (this.deleted) return;
    ellipse(
      this.originPoint.x,
      this.originPoint.y,
      dist(
        this.charge.pos.x,
        this.charge.pos.y,
        this.originPoint.x,
        this.originPoint.y
      ) * 2
    );
  }
}
