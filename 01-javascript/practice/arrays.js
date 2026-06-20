//  ===== ARRAYS IN JAVASCRIPT =====

// Array of String se - DSA ke questions Type Store kr rhe hai
const questions = ["Two Sum", "Reverse Linked List", "Binary Search","Dynamic Programming","Hashing"];

// Index se  access karna 
console.log(questions[0]);
console.log(questions[1]);
console.log(questions[2]);
console.log(questions[3]);
console.log(questions[4]);

// Array ki length nikalnna
console.log(questions.length);

// agr hm apne indexing se barh apna access lege to error aayega 
console.log(questions[5]);  // undefiend aayega output because hmne define hi nhi kiya hai apne index me 

console.log("Array Before Push : ", questions);

//  new topic addd krna by using this .push() Array ke sabse end mein naya element add karta hai;
questions.push("Merge Short");
console.log("Array After Push : ",questions);

//  Array ke sabse last wala element ko remove kr dega aur haa ye end se remove krta hai last element hata deta hai — "Merge Sort" gaya
questions.pop();
console.log("Array After Pop : ",questions);

// ===== COMMA vs PLUS WITH ARRAYS =====
const arr = ["A" , "B" , "C"];

console.log("Array with comma : " , arr);  // COMMA(,) — pura array as-is dikhaya, brackets ke saath
console.log("Array with Plus (+) : "+arr);   // PLUS(+) — array ko STRING mein convert kar diya, brackets gaye!

// ======= forEach LOOP======

 const myQuestions = ["Two Sum", "Reverse Linked List", "Binary Search"];
 myQuestions.forEach(function(questions){
    console.log(questions)
 });