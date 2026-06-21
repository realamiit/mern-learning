// =========OBJECT IN JAVASCRIPT=========

// eek question DSA Tracker ke liye
const question1 = {
    name: "Two Sum",
    topic: "Array",
    difficulty: "Easy",
    solvedDate: "2026-06-20",
    nextRevisionDate: "2026-06-23"
}

// Dot Natation se access karna we access  this because this is impoortant to know easily the question is 
console.log(question1.name);
console.log(question1.difficulty);
console.log(question1.topic);
console.log(question1.solvedDate);
console.log(question1.nextRevisionDate);


// ===CONST WITH OBJECT — PROPERTY CHANGE TEST===
// question1 ka difficulty change karte hain
console.log("Before change : ",question1.difficulty);
question1.difficulty = "Medium";
console.log("After Change : ",question1.difficulty);

// const ke saath property change ho gayi! Bilkul jaise expect kiya tha — 
// const ne variable ko reassign hone se roka hai, 
// but object ke andar ki property change karna allowed hai.


// ====ARRAY OF OBJECTS — REAL DSA TRACKER STRUCTURE===
const allQuestions = [
    { name: "Two Sum",topic: "Array",difficulty: "Easy" },
    { name: "Reverse Linked List",topic: "Linked List",difficulty: "Medium" },
    { name: "Two Binary",topic: "Array",difficulty: "Easy" },

];

// pehela object access access krte hai
console.log(allQuestions[0]);
console.log(allQuestions[0].name);
console.log(allQuestions[0].topic);




