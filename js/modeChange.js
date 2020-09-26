const selectMode = document.querySelector("select");
var toBasicMode = () => {
  basicMode = true;
  charges = [...chargesClone];

  for (c of charges) {
    c.render();
  }
  // fieldLine = undefined;
  // motion = undefined;
  // ratio = undefined;
};
var toNullPoint = () => {
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);

    for (const charge of charges) {
      charge.pos.y = height / 2;
    }

    setTimeout(() => {
      nullPoint = new NullPointMode(magField, charges);
      document.getElementById("remarks__here").innerHTML = nullPoint.remarks;
      document.getElementById("maths__here").innerHTML = nullPoint.maths;
    }, 500);
  }
};

var toCircularMotion = () => {
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);

    for (const charge of charges) {
      charge.pos.y = height / 2;
    }

    setTimeout(() => {
      nullPoint = new NullPointMode(magField, charges);
      document.getElementById("remarks__here").innerHTML = nullPoint.remarks;
      document.getElementById("maths__here").innerHTML = nullPoint.maths;
    }, 500);
  }
};

var toCircularMotion = () => {
  circularMode = true;
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);

    setTimeout(() => {
      motion = new CircularMode(charges[0], 0.07, 100);
      document.getElementById("remarks__here").innerHTML = motion.remarks;
      document.getElementById("maths__here").innerHTML = motion.maths;
    }, 1000);
  }
};

var toRatioBetweenForces = () => {
  if (chargesClone.length) {
    ratioMode = true;

    charges = chargesClone.slice(0, 2);

    setTimeout(() => {
      ratio = new RatioOfForces(charges);
      document.getElementById("remarks__here").innerHTML = ratio.remarks;
    }, 500);
  }
};

var toFieldLine = () => {
  if (chargesClone.length > 1) {
    fieldLineMode = true;

    charges = chargesClone.slice(0, 2);

    setTimeout(() => {
      fieldLine = new FieldLines(charges);
      document.getElementById("remarks__here").innerHTML = fieldLine.remarks;
      document.getElementById("maths__here").innerHTML = fieldLine.maths;
    }, 1000);
  }
};

selectMode.addEventListener("change", whileChanged);

function whileChanged(e) {
  fieldLine = undefined;
  fieldLineMode = false;
  circularMode = false;
  motion = undefined;
  ratio = undefined;
  nullPoint = undefined;
  basicMode = false;
  NullPointMode = false;
  document.getElementById("maths__here").innerHTML =
    "<p style='color:red; text-align:center'>Add necessary charges</p>";
  document.getElementById("remarks__here").innerHTML =
    "<p style='color:red; text-align:center'>Add necessary charges</p>";

  switch (selectMode.value) {
    case "CircularMotion":
      toCircularMotion();
      break;
    case "BasicModel":
      toBasicMode();
      break;

    case "FieldLine":
      toFieldLine();
      break;
    case "RatioBetweenForces":
      toRatioBetweenForces();
      break;
    case "NullPoint":
      toNullPoint();
      break;
    default:
      basicMode = true;
      fieldLine = undefined;
      motion = undefined;
      ratio = undefined;
      nullPoint = undefined;
      circularMode = false;
      break;
  }
}
