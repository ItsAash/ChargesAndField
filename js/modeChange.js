const selectMode = document.querySelector("select");
var toCircularMotion = () => {
  if (chargesClone.length) {
    charges = [chargesClone[0]];
    circularMode = true;
    const body = document.querySelector("body");
    const script = document.createElement("script");
    script.src = "modes/circularMotion.js";
    script.className = "circularModeScript";
    body.appendChild(script);

    setTimeout(() => {
      motion = new CircularMode(charges[charges.length - 1], 0.07, 100);
    }, 500);
  }
};

selectMode.addEventListener("change", (e) => {
  switch (selectMode.value) {
    case "CircularMotion":
      toCircularMotion();
      break;
    case "BasicModel":
      circularMode = false;
      motion = "";
      const circularModeScript = document.querySelector(".circularModeScript");
      if (circularModeScript) {
        charges = [...chargesClone];
        const body = document.querySelector("body");

        body.removeChild(circularModeScript);
        for (const c of charges) {
          c.render();
        }
      }

      break;

    default:
      break;
  }
});
