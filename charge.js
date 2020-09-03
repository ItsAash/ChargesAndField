class Charge {
  constructor(x, y, charge, lazy) {
    this.pos = createVector(x, y);
    this.charge = charge;
    this.lazy = lazy;
  }

  fieldLine(x, y) {
    const disp = p5.Vector.sub(createVector(x, y), this.pos);
    const distSq = disp.magSq();
    disp.setMag((k * this.charge) / distSq);
    return disp;
  }

  render() {
    const c = this.charge ? this.charge * 20 : 20;

    if (this.charge > 0) {
      noStroke();
      fill(this.lazy ? 128 : 255, 0, 0);
      circle(this.pos.x, this.pos.y, c);
      stroke(255);
      fill(255);
      text("+", this.pos.x - 5, this.pos.y + 5);
    } else if (this.charge < 0) {
      noStroke();
      fill(0, 0, this.lazy ? 128 : 255);
      circle(this.pos.x, this.pos.y, c);
      stroke(255);
      fill(255);
      text("-", this.pos.x - 1, this.pos.y + 4);
    }
  }

  contains(x, y) {
    if (
      x > this.pos.x - this.charge * 20 &&
      x < this.pos.x + this.charge * 20
    ) {
      if (
        y > this.pos.y - this.charge * 20 &&
        y < this.pos.y + this.charge * 20
      ) {
        return true;
      }
    }
  }
}
