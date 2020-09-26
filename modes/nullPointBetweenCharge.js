class NullPointMode {
  constructor(grids, charges) {
    this.grids = grids;
    this.charges = charges;
    this.remarks = "null point";
    this.maths = "null point";
  }

  init() {
    this.displayPoint();
  }

  displayPoint() {
    const chargeDist = actualDistBetnCharges(charges[0], charges[1]);
    if (this.charges.length < 2) return;
    const answers = this.calculateNullPoint();
    // console.log(answers);
    let posCharge;
    let negCharge;

    for (const charge of this.charges) {
      if (charge.charge > 0) {
        posCharge = charge;
      } else {
        negCharge = charge;
      }
    }

    let dstFrmPosCharge;
    let dstFrmNegCharge;

    if (posCharge.charge > -negCharge.charge) {
      dstFrmPosCharge = answers[0];
      dstFrmNegCharge = Math.abs(chargeDist - answers[0]);
    } else {
      dstFrmPosCharge = Math.abs(answers[0]);
      dstFrmNegCharge = chargeDist - answers[0];
    }

    push();
    ellipseMode(CENTER);
    ellipse(posCharge.pos.x + posCharge.r + dstFrmPosCharge, height / 2, 20);
    // ellipse(negCharge.pos.x + negCharge.r + dstFrmNegCharge, height / 2, 20);
    pop();

    if (posCharge.charge > -negCharge.charge) {
      dstFrmPosCharge = answers[1];
      dstFrmNegCharge = Math.abs(chargeDist - answers[1]);
    } else {
      dstFrmPosCharge = Math.abs(answers[1]);
      dstFrmNegCharge = chargeDist - answers[1];
    }

    push();
    ellipseMode(CENTER);
    ellipse(posCharge.pos.x + posCharge.r + dstFrmPosCharge, height / 2, 20);
    ellipse(negCharge.pos.x + negCharge.r + dstFrmNegCharge, height / 2, 20);
    pop();
  }

  calculateNullPoint() {
    const R = +actualDistBetnCharges(charges[0], charges[1]);

    const q1 = +Math.abs(this.charges[0].charge);
    const q2 = +Math.abs(this.charges[1].charge);

    // * quadratic maths here

    const a = Math.abs(q2 - q1);
    console.log(`%ca = ${a}`, `color: red`);
    const b = 2 * R * q1;
    console.log(`%cb = ${b}`, `color: green`);
    const c = Math.pow(R, 2) * q1;
    console.log(`%cc = ${c}`, `color: blue`);

    const quad1 = -b / (2 * a);
    const quad2 = Math.sqrt(b ** 2 + 4 * a * c) / (2 * a);
    console.log(b ** 2 + 4 * a * c);
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
