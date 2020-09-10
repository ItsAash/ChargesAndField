class Charge {
  constructor(x, y, charge, lazy) {
    this.pos = createVector(x, y);
    this.charge = charge;
    this.lazy = lazy;
    this.r = 0;
  }

  fieldLine(x, y) {
    const disp = p5.Vector.sub(createVector(x, y), this.pos);
    const distSq = disp.magSq();
    disp.setMag((k * this.charge) / distSq);
    return disp;
  }



  render() {
    this.r = 20;

    if (this.charge > 0) {
      noStroke();
      fill(this.lazy ? 128 : 255, 0, 0);
      ellipseMode(CENTER);
      ellipse(this.pos.x, this.pos.y, this.r * 2);
      stroke(255);
      fill(255);
      text("+", this.pos.x - 5, this.pos.y + 5);
    } else if (this.charge < 0) {
      noStroke();
      fill(0, 0, this.lazy ? 128 : 255);
      ellipseMode(CENTER);
      ellipse(this.pos.x, this.pos.y, this.r * 2);
      stroke(255);
      fill(255);
      text("-", this.pos.x - 1, this.pos.y + 4);
    }
  }

  kill() {
    this.charge = 0;
  }
}
