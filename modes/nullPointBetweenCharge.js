class NullPointMode {
  constructor(grids, charges) {
    this.grids = grids;
    this.charges = charges;
    this.remarks =
      "At null points, the net force (intensity also) produced by different charges cancel out to have zero field at that particular point. ";
    this.maths = "";
  }

  updateMaths(answers) {
    if (this.charges.length < 2) return;
    const maths = `
      Distance between them (R) = ${distBetnCharges(
        this.charges[0],
        this.charges[1]
      ).toFixed(2)}meters<br>
      <p>
        <b>Let, A be the null point.</b> <br>
        Equating intensities at A, <br>
        (k.q1)/x2 = (k.q2)/(R-x)2 <br>
        Or, q1.(R-x)2 = q2.x2 <br>
        Or, q1.(R2 - 2Rx + x2) = q2.x2 <br>
        Or, q1.R2 - (2q1.R)x + q1.x2 = q2.x2 <br>
        Or, (q2-q1)x2 + (2q1.R)x - q1R2 = 0 <br>
        <b>Using Quadratic equation,</b> <br>
        X<sub>1</sub> = ${(answers[0] / 125).toFixed(2)} <br>
        X<sub>2</sub> = ${(answers[1] / 125).toFixed(2)}
      </p>
    `;

    document.getElementById("maths__here").innerHTML = maths;
  }

  init() {
    this.displayPoint();
    this.draw();
  }

  displayPoint() {
    if (this.charges.length < 2) return;

    const answers = this.calculateNullPoint();
    this.updateMaths(answers);

    if (
      answers.includes(NaN) ||
      answers.includes(Infinity) ||
      answers.includes(-Infinity)
    )
      return;

    const chargeDistVector = vectorDistCharges(charges[0], charges[1]);
    const chargeDist = chargeDistVector.mag();
    chargeDistVector.normalize();

    chargeDistVector.setMag(answers[0]);

    let posDiffVec;
    if (
      (this.charges[0].charge < 0 && this.charges[1].charge > 0) ||
      (this.charges[0].charge > 0 && this.charges[1].charge < 0)
    ) {
      //case 1 && 2
      let posCharge;
      let negCharge;

      for (const charge of this.charges) {
        if (charge.charge > 0) {
          posCharge = charge;
        } else {
          negCharge = charge;
        }
      }

      if (posCharge.charge > -negCharge.charge) {
        chargeDistVector.normalize();
        chargeDistVector.setMag(answers[0]);
      } else {
        chargeDistVector.normalize();
        chargeDistVector.setMag(Math.abs(answers[0]));
      }

      push();
      ellipseMode(CENTER);

      if (posCharge.charge > -negCharge.charge) {
        chargeDistVector.normalize();
        chargeDistVector.setMag(answers[1]);
        posDiffVec = p5.Vector.mult(chargeDistVector, -1);
      } else {
        chargeDistVector.normalize();
        chargeDistVector.setMag(Math.abs(answers[1]));
        posDiffVec = p5.Vector.mult(chargeDistVector, -1);
      }

      ellipse(posCharge.pos.x + posDiffVec.x, height / 2, 10);
      ellipse(negCharge.pos.x + chargeDistVector.x, height / 2, 10);
      pop();
    } else {
      // case 3 && 4 here
      if (this.charges[0].charge > 0) {
        // both are pos charge
        push();
        ellipseMode(CENTER);

        chargeDistVector.normalize();
        chargeDistVector.setMag(answers[1]);
        chargeDistVector.mult(-1);

        
        pop();
      } else {
        // both are neg charge

        push();
        ellipseMode(CENTER);
        ellipse(this.charges[0].pos.x + chargeDistVector.x, height / 2, 10);

        chargeDistVector.normalize();
        chargeDistVector.setMag(Math.abs(answers[1]));

        
        pop();
      }
    }
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
  

  calculateNullPoint() {
    const vectorDiff = vectorDistCharges(charges[0], charges[1]);
    const R = vectorDiff.mag();
    const q1 = +Math.abs(this.charges[0].charge);
    const q2 = +Math.abs(this.charges[1].charge);

    // * quadratic maths here

    const a = Math.abs(q2 - q1);
    // console.log(`%ca = ${a}`, `color: red`);
    const b = 2 * R * q1;
    // console.log(`%cb = ${b}`, `color: green`);
    const c = Math.pow(R, 2) * q1;
    // console.log(`%cc = ${c}`, `color: blue`);

    const quad1 = -b / (2 * a);
    const quad2 = Math.sqrt(b ** 2 + 4 * a * c) / (2 * a);
    // console.log(b ** 2 + 4 * a * c);
    // console.log(
    //   `%cQuad1: ${quad1}`,
    //   `background-color:red; color: white; font-weight: bolder`
    // );
    const answers = [0, 0];
    answers[0] = quad1 + quad2;
    answers[1] = quad1 - quad2;
    // console.log(
    //   `%cQuad2: ${quad2}`,
    //   `background-color:blue; color: white; font-weight: bolder`
    // );

    return answers;
  }
}
