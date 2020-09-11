//CURIOSITY

// DOM variables
const addPosCharge = document.getElementById("pos__button");
const negPosCharge = document.getElementById("neg__button");

// circular motion testing
let motion;

const size = 30;
let cols;
let rows;

const charges = [];
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

  // if (motion) {
  //   motion.init();
  // }

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
    c.pos.x = mouseX;
    c.pos.y = mouseY;
    if (
      c.pos.x > binOptions.x &&
      c.pos.x < binOptions.x + binOptions.width &&
      c.pos.y > binOptions.y &&
      c.pos.y < binOptions.y + binOptions.height
    ) {
      c.kill();
    } else {
      console.log("hsss");
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

function showError() {
  document.querySelector(".error").style.display = "block";

  setTimeout(() => {
    document.querySelector(".error").style.display = "none";
  }, 2000);
}

addPosCharge.addEventListener("click", addCharge);
negPosCharge.addEventListener("click", addCharge);

function addCharge(e) {
  const target = e.target;

  if (target.id === "pos__button") {
    var arge;
    const PC = document.querySelector(".pos_input").value; //PC => Positive Charge
    if (PC > 10) {
      showError();
    } else if (PC > 0) {
      charges.push(new Charge(width / 2, height / 2, PC, false));
    }
  }
  if (target.id === "neg__button") {
    const NC = document.querySelector(".neg_input").value; //NC => Negative Charge
    if (NC > 10) {
      showError();
    } else if (NC > 0) {
      charges.push(new Charge(width / 2, height / 2, -NC, false));
    }
  }

  motion = new CircularMode(charges[charges.length - 1], 0.1, 100);
}
