class Grid {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.force = createVector();
  }

  show(charges) {
    push();
    const x = this.i * size + size / 2;
    const y = this.j * size + size / 2;
    const sum = createVector();
    for (const c of charges) {
      const force = c.fieldLine(x, y);
      sum.add(force);
    }
    sum.mult(200);
    sum.limit(20);
    this.force = sum;

    rectMode(CENTER);
    noFill();
    const opacity = map(sum.magSq(), 0, 10, 0, 1) * 2;
    stroke(0, 204, 0, opacity);
    translate(x, y);
    circle(0, 0, 4);
    stroke(255, 255, 255, opacity);
    strokeWeight(1);
    line(0, 0, sum.x, sum.y);

    rotate(sum.heading());
    let arrowSize = 7;

    translate(sum.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }
}
