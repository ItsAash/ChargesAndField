class NullPointMode {
  constructor(grids, charges) {
    this.grids = grids;
    this.charges = charges;
    this.remarks = "null point";
    this.maths = "null point";
  }

  init() {
    this.calculateNullPoint();
  }

  calculateNullPoint() {
    if (this.charges.length < 2) return;
    for (const cols of this.grids) {
      for (const grid of cols) {
        if (floor(grid.force.mag()) === 0) {
          const x = grid.i * size + size / 2;
          const y = grid.j * size + size / 2;
          console.log("here");

          push();
          fill(255);
          ellipseMode(CENTER);
          ellipse(x, y, 20);
          pop();
        }
      }
    }
  }
}
