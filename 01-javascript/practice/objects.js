// =========OBJECT IN JAVASCRIPT=========

// eek question DSA Tracker ke liye
const question1 = {
  name: "Two Sum",
  topic: "Array",
  difficulty: "Easy",
  solvedDate: "2026-06-20",
  nextRevisionDate: "2026-06-23",
};

// Dot Natation se access karna we access  this because this is impoortant to know easily the question is
console.log(question1.name);
console.log(question1.difficulty);
console.log(question1.topic);
console.log(question1.solvedDate);
console.log(question1.nextRevisionDate);

// ===CONST WITH OBJECT — PROPERTY CHANGE TEST===
// question1 ka difficulty change karte hain
console.log("Before change : ", question1.difficulty);
question1.difficulty = "Medium";
console.log("After Change : ", question1.difficulty);

// const ke saath property change ho gayi! Bilkul jaise expect kiya tha —
// const ne variable ko reassign hone se roka hai,
// but object ke andar ki property change karna allowed hai.

// ====ARRAY OF OBJECTS — REAL DSA TRACKER STRUCTURE===
const allQuestions = [
  { name: "Two Sum", topic: "Array", difficulty: "Easy" },
  { name: "Reverse Linked List", topic: "Linked List", difficulty: "Medium" },
  { name: "Two Binary", topic: "Array", difficulty: "Easy" },
];

// pehela object access access krte hai
console.log(allQuestions[0]);
console.log(allQuestions[0].name);
console.log(allQuestions[0].topic);

// Looping Throught Array of Object

allQuestions.forEach(function (question) {
  console.log(
    question.name + " - " + question.topic + " - " + question.difficulty,
  );
});




// ===== == vs === COMPARISON =====

console.log(5 == "5");    // loose equality
console.log(5 === "5");   // strict equality


//======Filtring the Array of element with forEach + if condation =====

console.log("----- Easy Questions Only------");

allQuestions.forEach(function(question1){
if(question1.difficulty === "Easy"){
  console.log(question1.name)
}
});


// ======Date Basics=========

const today = new Date();

// 3 din add karna
const day3Revision = new Date();
day3Revision.setDate(today.getDate()+3);
  console.log("Today: ",today)  //  2026-06-22T10:32:00.845Z
                                //  ↑          ↑      ↑  ↑
                               // Date      Time(HH:MM:SS) ms  "Z" = UTC timezone (Zulu time)
console.log("Day 3 Revision:", day3Revision);  // Day 3 Revision: 2026-06-25T10:44:12.278Z

// 7 din add krna 
const day7Revision = new Date();
day7Revision.setDate(today.getDate()+7);
console.log("Day 7 Revisie Today" , day7Revision);


// 15 din add krna 
const day15Revision = new Date();
day15Revision.setDate(today.getDate()+15);
console.log("Day 15 Revisie Today" , day15Revision);

// 30 din add krna 
const day30Revision = new Date();
day30Revision.setDate(today.getDate()+30);
console.log("Day 30 Revisie Today" , day30Revision);
