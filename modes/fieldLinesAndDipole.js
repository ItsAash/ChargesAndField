class FieldLines {
  constructor(charges) {
    this.charges = charges;

    this.remarks =
      "A dipole moment is a mesurement of the seperation of two opposite electrical charges.";
  }

  updateMaths() {
    const q = Math.abs(this.charges[0].charge);
    const distance = distBetnCharges(this.charges[0], this.charges[1]).toFixed(
      2
    );
    document.getElementById("remarks__here").innerHTML = this.remarks;

    const dipoleMoment = (q * distance).toFixed(2);

    const maths = `
    Distance between charges (d) = ${distance} meters <br />
    Charge (q) = ${q}C <br />
    Dipole moment (p) = ${dipoleMoment} C/m `;
    document.getElementById("maths__here").innerHTML = maths;
  }

  init() {
    this.updateMaths();
    this.draw();
  }

  draw() {
    push();
    if (this.charges.length === 2) {
      strokeWeight(2);
      stroke(0, 204, 0);
      line(
        charges[0].pos.x,
        charges[0].pos.y,
        charges[1].pos.x,
        charges[1].pos.y
      );
    }
    pop();
  }
}
