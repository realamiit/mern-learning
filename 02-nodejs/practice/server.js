// http module ko import kar rahe hain - ye Node.js ka BUILT-IN module hai
// isliye npm install nahi karna pada, seedha require() kar liya
const http = require("http");

// http.createServer() ek server object banata hai
// isko ek function diya jata hai (callback) jo HAR REQUEST ke time chalta hai
// req = request (browser se kya aaya)
// res = response (hum browser ko kya bhejenge)
const server = http.createServer((req, res) => {
  // res.end() response ko complete karta hai aur data bhej deta hai
  // jab tak end() nahi bolte, browser wait karta rahega response ke liye
  res.end("Hello i am Amit from DSA Tracker Backend!");
});

// server ko ek PORT par "listen" karne ke liye bolte hain
// port = ek number jo identify karta hai ki kis "channel" pe server sun raha hai
// 3000 ek common choice hai development ke liye (koi specific reason nahi, convention hai)
server.listen(3000, () => {
  // ye callback sirf EK BAAR chalta hai - jab server successfully start ho jata hai
  console.log("Server chal raha hai: http://localhost:3000");
});