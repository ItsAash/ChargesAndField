class Grid {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  show(charges) {
    const x = this.i * size + size / 2;
    const y = this.j * size + size / 2;
    const sum = createVector();
    for (const c of charges) {
      const force = c.fieldLine(x, y);
      sum.add(force);
    }
    sum.mult(200);
    sum.limit(20);

    rectMode(CENTER);
    noFill();
    const opacity = map(sum.magSq(), 0, 10, 0, 1) * 2;
    stroke(0, 204, 0, opacity);
    // rect(x, y, size, size);
    circle(x, y, 4);
    stroke(255, 255, 255, opacity);
    strokeWeight(1);
    line(x, y, x + sum.x, y + sum.y);
  }
}
