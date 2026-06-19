//  ================  VARIABLES IN JAVASCRIPT ==========

// let  Value change ho skati hai baad mein

let studentName = "Amit Gupta";
let score = 0;
let currentLevel = 1;

// const Value fix hai kabhi nhi badlegi

const maxLevel = 10;
const appName = "DSA Tracker";

appname = "New App";

// value console me print karo
// console.log() - ye Nodejs/browser me bolta hai : "ye value terminal me Dikhaio"

console.log(studentName);
console.log(score);
console.log(currentLevel);
console.log(maxLevel);
console.log(appName);
console.log(appName);

// ======SCOPE DEMO ========

// let ka block scope
{
  let insideLet = "Main Block Ke Uder Hun";
  console.log(insideLet); // line A
}

// console.log(insideLet);  line B ye line comment is liye hai kyuki Error dega (ye access nhi kr payega)

// var ka probleam
{
  var insideVar = "Mai Block ke under huu";
  console.log(insideVar); // line C
}

console.log(insideVar); // line D hai ye ye bahar bhi chla gya ye (Accessed hai)


