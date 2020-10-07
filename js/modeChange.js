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
  
   const neg_input =document.querySelector(".neg_input") ;
   neg_input.min= 1;
   neg_input.max = 5;
   document.querySelector('.negative_value').textContent= neg_input.value;

  const pos_input =document.querySelector(".pos_input") ;
  pos_input.min =1;
  pos_input.max = 5;
  document.querySelector('.positive_value').textContent= pos_input.value;

  



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
  const radius = document.getElementById("radius");
const radius_value = document.querySelector(".radius"); 
   radius.style.display= "block";
  circularMode = true;
  if (chargesClone.length) {
    charges = chargesClone.slice(0, 2);

    setTimeout(() => {
      motion = new CircularMode(charges[0], 0.07,parseInt(radius_value.value));
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
  document.querySelector(".neg_input").style.visibility ="hidden";
  document.querySelector(".negative_value").style.display = "none";
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

  const neg_input =document.querySelector(".neg_input");
  const pos_input =document.querySelector(".pos_input");
  document.getElementById("radius").style.display= "none";
   neg_input.min= 1;
   neg_input.max = 10;
   pos_input.min= 1;
   pos_input.max = 10;
   neg_input.style.visibility="visible";
   document.querySelector(".negative_value").style.display = "block";
  fieldLine = undefined;
  fieldLineMode = false;
  circularMode = false;
  motion = undefined;
  ratio = undefined;
  nullPoint = undefined;
  basicMode = false;
  nullPointMode = false;
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
