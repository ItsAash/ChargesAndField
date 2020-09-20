const selectMode = document.querySelector("select");

var toNullPoint = () => {
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);

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

    setTimeout(() => {
      motion = new CircularMode(charges[0], 0.07, 100);
      document.getElementById("remarks__here").innerHTML = motion.remarks;
      document.getElementById("maths__here").innerHTML = motion.maths;
    }, 1000);
  }
};

var toRatioBetweenForces = () => {
  circularMode = false;
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);

    setTimeout(() => {
      ratio = new RatioOfForces(charges);
      document.getElementById("remarks__here").innerHTML = ratio.remarks;
    }, 500);
  }
};

var toFieldLine = () => {
  fieldLineMode = true;

  if (chargesClone.length) {
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
  motion = undefined;
  ratio = undefined;
  nullPoint = undefined;
  basicMode = false;

  switch (selectMode.value) {
    case "CircularMotion":
      toCircularMotion();
      break;
    case "BasicModel":
      basicMode = true;
      circularMode = false;

      // fieldLine = undefined;
      // motion = undefined;
      // ratio = undefined;
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
      break;
  }
}
