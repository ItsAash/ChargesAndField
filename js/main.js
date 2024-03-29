//CURIOSITY
var basicMode = true;

var circularMode; // This is needed. Don't delete it.
var fieldLineMode; //This too
var ratioMode;
// DOM variables
const addPosCharge = document.getElementById("pos__button");
const negPosCharge = document.getElementById("neg__button");

//  modes
let motion;
let fieldLine;
let ratio;
let nullPoint;
document.querySelector(".radius").addEventListener("change",(e)=>{whileChanged()
  toCircularMotion()});

const size = 30;
let cols;
let rows;

var charges = [];
var chargesClone = [];
const k = 25000;

let magField;
let w;
let h;

const currentlyDragging = {
  charge: null,
  status: false,
};

//images
let binImage;
let binOptions = {
  width: 70,
  height: 70,
  x: 10,
  y:
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ) - 100,
};

function preload() {
  binImage = loadImage("../images/bin.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  cols = floor(width / size);
  rows = floor(height / size);

  magField = make2DArray(cols, rows);

  w = width - (width % cols);
  h = height - (height % rows);

  for (let i = 0; i < magField.length; i++) {
    for (let j = 0; j < magField[i].length; j++) {
      magField[i][j] = new Grid(i, j);
    }
  }
  frameRate(200);

  whileChanged();

  // nullPoint = new NullPointMode(magField, charges);
}

function draw() {
  background(0);

  for (let i = 0; i < magField.length; i++) {
    for (let j = 0; j < magField[i].length; j++) {
      magField[i][j].show(charges);
    }
  }

  for (const c of charges) {
    c.render();
  }

  // Uncomment the below if statement to visuilize circular mode

  if (basicMode) {
    showDistance();
  }

  if (motion) {
    motion.init();
  }

  if (fieldLine) {
    fieldLine.init();
  }

  if (ratio) {
    ratio.init();
  }
  if (nullPoint) {
    nullPoint.init();
  }
  drawBin();
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function mouseDragged() {
  if (!currentlyDragging.status) {
    for (const c of charges) {
      if (
        mouseX > c.pos.x - c.r &&
        mouseX < c.pos.x + c.r &&
        mouseY > c.pos.y - c.r &&
        mouseY < c.pos.y + c.r
      ) {
        currentlyDragging.status = true;
        currentlyDragging.charge = c;
      }
    }
  } else {
    const c = currentlyDragging.charge;
    const currentlySelectedMode = document.querySelector("select").value;

    circularMode = currentlySelectedMode === "CircularMotion" ? true : false;
    const isNullPointActive =
      currentlySelectedMode === "NullPoint" ? true : false;

    c.pos.x = mouseX;
    c.pos.y = isNullPointActive ? height / 2 : mouseY;

    if (
      c.pos.x > binOptions.x &&
      c.pos.x < binOptions.x + binOptions.width &&
      c.pos.y > binOptions.y &&
      c.pos.y < binOptions.y + binOptions.height
    ) {
      c.kill();
      charges = charges.filter((charge) => charge.id != c.id);

      if (circularMode) {
        motion = new CircularMode(charges[0], 0.07, 100);
      }

      chargesClone = [...charges];
    }
  }
}

function mouseReleased() {
  if (currentlyDragging.status) {
    currentlyDragging.status = false;
  }
}

function drawBin() {
  binImage.resize(binOptions.width, binOptions.height);
  image(binImage, binOptions.x, binOptions.y);
}

function showDistance() {
  const maths = [];
  for (const c1 of charges) {
    for (const c2 of charges) {
      if (c1 !== c2) {
        if (c2.number > c1.number) {
          maths.push(
            `Distance between <b> ${c1.number} </b> and <b> ${
              c2.number
            } </b> = ${distBetnCharges(c1, c2).toFixed(2)} meter/s`
          );
        }
      }
    }
  }
  document.getElementById("maths__here").innerHTML = maths.join("<br />");
  document.getElementById("remarks__here").innerHTML =
    "The field lines of the positive charge are directed outwards while the field lines of the negative charge are directed inwards.";
}

addPosCharge.addEventListener("click", addCharge);
negPosCharge.addEventListener("click", addCharge);

function addCharge(e) {
  const target = e.target;
  var arge;

  var error = false;
  if (charges.length >= 5 || (charges.length == 2 && !basicMode)) {
    document.querySelector(".chargeError").style.display = "block";
    setTimeout(() => {
      document.querySelector(".chargeError").style.display = "none";
    }, 3000);
    error = true;
  } else {
    // motion = ()

    if (target.id === "pos__button") {
      const PC = +document.querySelector(".pos_input").value; //PC => Positive Charge

      if (PC > 0) {
        charges.push(new Charge(width / 2, height / 2, PC, false));
        chargesClone = [...charges];
        const selectorValue = document.querySelector("select").value;
        if (selectorValue === "CircularMotion" && !circularMode) {
          toCircularMotion();
        } else if (selectorValue === "FieldLine" && !fieldLineMode) {
          toFieldLine();
        } else if (selectorValue === "RatioBetweenForces" && !ratioMode) {
          toRatioBetweenForces();
        }
      }
    } else if (target.id === "neg__button") {
      const NC = document.querySelector(".neg_input").value; //NC => Negative Charge
      const selectorValue = document.querySelector("select").value;
      if (NC > 0) {
        charges.push(new Charge(width / 2, height / 2, -NC, false));
        chargesClone = [...charges];

        if (selectorValue == "CircularMotion" && !circularMode) {
          toCircularMotion();
        } else if (selectorValue == "FieldLine" && !fieldLineMode) {
          toFieldLine();
        }
      }
    }
    if (charges.length === 1) {
      whileChanged();
    }
  }
}

function mousePressed() {
  if (nullPoint) {
    if (charges.length < 2) return;
    const point = nullPoint.calculateNullPoint();
    console.log(point);
  }

  return;
  const x = mouseX;
  const y = mouseY;

  const i = floor(x / size);
  const j = floor(y / size);

  for (const cols of magField) {
    for (const grid of cols) {
      if (grid.i === i && grid.j === j) {
        grid.highlight();
        console.log(grid.force.mag());
      }
    }
  }
}
