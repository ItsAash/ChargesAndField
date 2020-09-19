const selectMode = document.querySelector("select");
var toCircularMotion = () => {
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);
    circularMode = true;
    const body = document.querySelector("body");
    const script = document.createElement("script");
    script.src = "modes/circularMotion.js";
    script.className = "circularModeScript";
    body.appendChild(script);

    console.log("Hello world");

    setTimeout(() => {
      motion = new CircularMode(charges[0], 0.07, 100);
      document.getElementById("remarks__here").innerHTML = motion.remarks;
      document.getElementById("maths__here").innerHTML = motion.maths;
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
