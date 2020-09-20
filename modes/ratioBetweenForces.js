class RatioOfForces {
  constructor(charges) {
    this.charges = charges;
    this.remarks =
      "The magnitude of electrostatics force is highly greater than gravitational force between two charges";
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
  updateMaths() {
    if (this.charges.length < 2) return;
    const k = 9 * Math.pow(10, 9); // Dielectric constant
    const G = 6.67 * Math.pow(10, -11);

    const q1 = this.charges[0].charge;
    const q2 = this.charges[1].charge;
    const r = distBetnCharges(this.charges[0], this.charges[1]).toFixed(2);
    const Fe = (k * Math.abs(q1 * q2)) / Math.pow(r, 2);

    const x = 1.04375 * Math.pow(10, -8);
    const y = 5.6875 * Math.pow(10, -12);

    const m1 = q1 > 0 ? q1 * x : Math.abs(q1) * y;
    const m2 = q2 > 0 ? q2 * x : Math.abs(q2) * y;

    const Fg = (G * (m1 * m2)) / Math.pow(r, 2);

    const ratio = Fe / Fg;

    //(num.toExponential().replace(/e\+?/, ' x 10^'));
    const maths = `
      Charge of 1 (q1) = ${q1} C <br>
      Charge of 2 (q2) = ${q2} C <br>
      Mass of 1 (m1) = ${m1.toExponential().replace(/e\+?/, " x 10^")} KG<br>
      Mass of 2 (m2) = ${m2.toExponential().replace(/e\+?/, " x 10^")} KG<br>
      Distance between them (r) = ${r} meters <br>
      Electrostatic Force (Fe) = ${Fe.toExponential().replace(
        /e\+?/,
        " x 10^"
      )} C/m2 <br>
      Gravitational Force (Fg) = ${Fg.toExponential().replace(
        /e\+?/,
        " x 10^"
      )} N <br>
      Ratio Between Electrostatic Force to Gravitational Force (Fe/Fg)= ${ratio
        .toExponential()
        .replace(/e\+?/, " x 10^")}
    `;

    document.getElementById("maths__here").innerHTML = maths;
    document.getElementById("remarks__here").innerHTML = this.remarks;
  }
}
