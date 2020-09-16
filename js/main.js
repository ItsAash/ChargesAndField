//CURIOSITY
var circularMode;
var basicMode = true;

// DOM variables
const addPosCharge = document.getElementById("pos__button");
const negPosCharge = document.getElementById("neg__button");

// circular motion testing
let motion;

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

  if (motion) {
    motion.init();
  }

  drawBin();
  if (basicMode) {
    showDistance();
  }
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
    c.pos.x = mouseX;
    c.pos.y = mouseY;
    if (
      c.pos.x > binOptions.x &&
      c.pos.x < binOptions.x + binOptions.width &&
      c.pos.y > binOptions.y &&
      c.pos.y < binOptions.y + binOptions.height
    ) {
      c.kill(motion || undefined);
      charges = charges.filter((charge) => charge.id != c.id);
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
            } </b> = ${distBetnCharges(c1, c2)} meter/s`
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

  if (charges.length >= 5 || (charges.length == 2 && circularMode)) {
    document.querySelector(".chargeError").style.display = "block";
    setTimeout(() => {
      document.querySelector(".chargeError").style.display = "none";
    }, 3000);
  } else {
    if (target.id === "pos__button") {
      const PC = document.querySelector(".pos_input").value; //PC => Positive Charge

      if (PC > 0) {
        charges.push(new Charge(width / 2, height / 2, PC, false));
        chargesClone = [...charges];
        if (
          document.querySelector("select").value == "CircularMotion" &&
          !circularMode
        ) {
          toCircularMotion();
        }
      }
    } else if (target.id === "neg__button") {
      const NC = document.querySelector(".neg_input").value; //NC => Negative Charge

      if (NC > 0) {
        charges.push(new Charge(width / 2, height / 2, -NC, false));
        chargesClone = [...charges];
      }
    }
  }
  if (circularMode) {
    motion = new CircularMode(charges[charges.length - 1], 0.07, 100);
  }
}
