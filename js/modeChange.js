const selectMode = document.querySelector("select");

var toNullPoint = () => {
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);

    const body = document.querySelector("body");
    const script = document.createElement("script");
    script.src = "modes/nullPointBetweenCharge.js";
    script.className = "modeScript";
    body.appendChild(script);

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

    const body = document.querySelector("body");
    const script = document.createElement("script");
    script.src = "modes/circularMotion.js";
    script.className = "modeScript";
    body.appendChild(script);

    setTimeout(() => {
      motion = new CircularMode(charges[0], 0.07, 100);
      document.getElementById("remarks__here").innerHTML = motion.remarks;
      document.getElementById("maths__here").innerHTML = motion.maths;
    }, 500);
  }
};

var toRatioBetweenForces = () => {
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);

    const body = document.querySelector("body");
    const script = document.createElement("script");
    script.src = "modes/ratioBetweenForces.js";
    script.className = "modeScript";
    body.appendChild(script);

    setTimeout(() => {
      ratio = new RatioOfForces(charges);
      document.getElementById("remarks__here").innerHTML = ratio.remarks;
    }, 500);
  }
};

var toFieldLine = () => {
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);

    const body = document.querySelector("body");
    const script = document.createElement("script");
    script.src = "modes/fieldLinesAndDipole.js";
    script.className = "modeScript";
    body.appendChild(script);

    setTimeout(() => {
      fieldLine = new FieldLines(charges);
      document.getElementById("remarks__here").innerHTML = fieldLine.remarks;
      document.getElementById("maths__here").innerHTML = fieldLine.maths;
    }, 500);
  }
};

selectMode.addEventListener("change", whileChanged);

function whileChanged(e) {
  fieldLine = undefined;
  motion = undefined;
  ratio = undefined;
  nullPoint = undefined;
  basicMode = false;

  const modeScript = document.querySelector(".modeScript");
  if (modeScript) {
    charges = [...chargesClone];
    const body = document.querySelector("body");

    body.removeChild(modeScript);
    for (const c of charges) {
      c.render();
    }
  }

  switch (selectMode.value) {
    case "CircularMotion":
      toCircularMotion();
      break;
    case "BasicModel":
      basicMode = true;

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
