const selectMode = document.querySelector("select");
var toBasicMode = () => {
  basicMode = true;
  circularMode = false;
  fieldLineMode = false;

  // fieldLine = undefined;
  // motion = undefined;
  // ratio = undefined;

  const modeScript = document.querySelectorAll(".modeScript");
  if (modeScript) {
    charges = [...chargesClone];

    const body = document.querySelector("body");
    modeScript.forEach((mode) => {
      body.removeChild(mode);
    });

    for (const c of charges) {
      c.render();
    }
  }
};
var toCircularMotion = () => {
  fieldLineMode = false;
  basicMode = false;
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
    }, 1000);
  }
};

var toRatioBetweenForces = () => {
  basicMode = false;
  circularMode = false;
  basicMode = false;
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
  circularMode = false;
  basicMode = false;
  if (chargesClone.length > 1) {
    fieldLineMode = true;

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
    }, 1000);
  }
};

selectMode.addEventListener("change", (e) => {
  document.getElementById("maths__here").innerHTML =
    "<p style='color:red; text-align:center'>Add necessary charges</p>";
  document.getElementById("remarks__here").innerHTML =
    "<p style='color:red; text-align:center'>Add necessary charges</p>";
  fieldLine = undefined;
  motion = undefined;
  ratio = undefined;
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
    default:
      break;
  }
});
