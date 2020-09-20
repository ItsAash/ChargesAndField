var id = 0;
class Charge {
  constructor(x, y, charge, lazy) {
    this.pos = createVector(x, y);
    this.charge = charge;
    this.lazy = lazy;
    this.id = id += 1;

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
    this.number = charges.indexOf(this) + 1;

    if (this.charge > 0) {
      noStroke();
      fill(this.lazy ? 128 : 255, 0, 0);
      ellipseMode(CENTER);
      ellipse(this.pos.x, this.pos.y, this.r * 2);
      stroke(255);
      fill(255);
      text("+", this.pos.x - 5, this.pos.y + 5);
      text(`${this.number}`, this.pos.x - 5, this.pos.y + 30);
    } else if (this.charge < 0) {
      noStroke();
      fill(0, 0, this.lazy ? 128 : 255);
      ellipseMode(CENTER);
      ellipse(this.pos.x, this.pos.y, this.r * 2);
      stroke(255);
      fill(255);
      text("-", this.pos.x - 1, this.pos.y + 4);
      text(`${this.number}`, this.pos.x - 5, this.pos.y + 30);
    }
  }

  kill() {
    this.charge = 0;
    motion = undefined;
    whileChanged();

    charges.forEach((charge) => {
      charge.number = charges.indexOf(charge);
    });
  }
}

function distBetnCharges(charge1, charge2) {
  const distance = dist(
    charge1.pos.x,
    charge1.pos.y,
    charge2.pos.x,
    charge2.pos.y
  );
  return (distance + (charge1.r + charge2.r)) / 125;
}
