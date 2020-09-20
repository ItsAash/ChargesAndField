const selectMode = document.querySelector("select");
var toCircularMotion = () => {
  fieldLineMode = false;
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
  circularMode = false;
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
  fieldLineMode = true;

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
    }, 1000);
  }
};

selectMode.addEventListener("change", (e) => {
  fieldLine = undefined;
  motion = undefined;
  ratio = undefined;
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
