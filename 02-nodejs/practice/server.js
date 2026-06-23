// http module ko import kar rahe hain - ye Node.js ka BUILT-IN module hai
// isliye npm install nahi karna pada, seedha require() kar liya
// Very important note: http module ke liye npm install ki zaroorat nahi hai, kyunki ye Node.js ka built-in module hai — Node.js install karte hi
//  ye automatically available ho jata hai. Hum sirf require('http') likh kar isko import karte hain.
//  npm install sirf external/third-party modules (jaise Express) ke liye chahiye hota hai, jo Node.js ke saath nahi aate

// Key difference jo interview mein bolna hai:
// 1. Built-in module → require() se directly use, install nahi karna
// 2. External module → pehle npm install, phir require()
const http = require("http");

// http.createServer() ek server object banata hai
// isko ek function diya jata hai (callback) jo HAR REQUEST ke time chalta hai
// req = request (browser se kya aaya)
// res = response (hum browser ko kya bhejenge)
const server = http.createServer((req, res) => {

  // req.url mein wo EXACT PATH hota hai jo browser ne request kiya
   console.log("Request aayi is Url par: ",req.url);   

   if (req.url === "/dashboard"){
    res.end("Yeh dashboard page hai!");
   }else{
    res.end("Yeh home page hai");
   }
   
  // res.end() response ko complete karta hai aur data bhej deta hai
 // jab tak end() nahi bolte, browser wait karta rahega response ke liye
  // res.end("Hello i am Amit from DSA Tracker Backend!");
});

// ========task=========
// const server = http.createServer/dashboard((req,res) => {
//   res.end("Yeh dashboard page hai!");
// })

// const server = http.createServer/questions((req,res) => {
//   res.end(");
//   res.end(v");
// })


// server ko ek PORT par "listen" karne ke liye bolte hain
// port = ek number jo identify karta hai ki kis "channel" pe server sun raha hai
// 3000 ek common choice hai development ke liye (koi specific reason nahi, convention hai)
server.listen(3000, () => {
  // ye callback sirf EK BAAR chalta hai - jab server successfully start ho jata hai
  console.log("Server chal raha hai: http://localhost:3000");
});