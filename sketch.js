const size = 30;
let cols;
let rows;

const charges = [];
const k = 25000;

let magField;
let w;
let h;

//images
let binImage;

function preload() {
  // binImage = loadImage('./images/bin.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // cols = (width / size) | 0;
  // rows = (width / size) | 0;
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
}

function mousePressed() {
  if (mouseButton == LEFT) {
    charges.push(new Charge(mouseX, mouseY, 1, false));
  } else if (mouseButton == RIGHT) {
    charges.push(new Charge(mouseX, mouseY, -1, false));
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
  for (const c of charges) {
    if (c.contains(mouseX, mouseY)) {
      c.pos.x = mouseX;
      c.pos.y = mouseY;
    }
  }
}
