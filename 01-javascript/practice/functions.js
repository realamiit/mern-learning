// ========FUNCTION IN JS=======

// function Declear  basics declearation

function calculateNextRevision() {
  // function ke andar ka variable — sirf yahan accessible
  let nextData = "DAY 3"; // yeh FUNCTION SCOPE ke andar hai
  console.log(nextData);
}

//  function banaane ka mtlb - vo khud se chlta nhi hai
// usko call krna padta hai yani "bulaoo isko"

calculateNextRevision();

// ye function ko fir se call kr skte hooo -- jitni baar chahooo
calculateNextRevision();
calculateNextRevision();

// ye niche wali line ERROR dega - kyuki ye function ke undr declear to hai but baher accessible nhi hai
// console.log(nextData);

// ===== PARAMETERS AND ARGUMENTS =====

// "day" yahan PARAMETER hai — placeholder
function showRevisionDay(day) {
  console.log("Revision scheduled on: " + day);
}

// jab function call kar rahe hain - yeh ARGUMENT hai — actual value

showRevisionDay("Day 3");
showRevisionDay("Day 7");
showRevisionDay("Day 15");
showRevisionDay("Day 30");
// Yeh real power of functions hai — ek baar likho, infinite use cases handle karo.
//  Variables/parameters always lowercase se start

function addTwoNumber(a, b) {
  console.log(a + b);
}
let result = addTwoNumber(5, 4);
console.log("Result is : " + result);

// 9          ← console.log(a + b) ka print
// undefined  ← result variable, kyunki return nahi tha

//  ===== RETURN STATEMENT — WITH RETURN =====

function addTwoNumberV2(a, b) {
  return a + b; // ye function value ke bahr ja rha hai
  // console.log()  yha nhi hai - kyuki hme print nhi return chahiiye
}

let result2 = addTwoNumberV2(5, 4);
console.log("Result id : " + result2);

// =======ARROW FUNCTION=======

// long wali hai ye
const addTwoNumbersArrow = (a, b) => {
  return a + b;
};

let result3 = addTwoNumbersArrow(10, 20);
console.log("Result is : " + result3);

// =======ARROW FUNCTION SHORT FORM=======

// short wali hai ye dono same kaam krti hai
const addShort = (a, b) => a + b;

console.log("Short form Result is : " + addShort(5, 10));
