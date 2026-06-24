// express external module hai (npm install express se download kiya tha)
// isliye http jaisa seedha require nahi - pehle install karna padta hai
const Express = require("express");

// express() call karne par "app" object milta hai
// isi app object se hum routes define karenge aur server start karenge
const app = Express();

// app.get(path, callback) - jab koi GET request "/" (home) par aaye, ye callback chalega
// GET = browser jab normally URL kholta hai, wo GET request hoti hai (data maangna)
app.get("/" , (req , res) => {
    // res.send() - Express ka method, http module ke res.end() jaisa hi kaam karta hai
  // lekin zyada flexible hai (string, object, etc. sab handle kar leta hai)
    res.send("Ye Home Page!!");
});

// dusra route - /dashboard path ke liye alag callback
// dhyan do: yaha koi if/else nahi - Express khud route ko match karke
// sahi callback chalata hai, humein manually check nahi karna
app.get("/dashboard",(req , res) => {
    res.send("Ye Dashboard Page hai!!");
});

app.get("/questions",(req,res) => {
    res.send("Ye Sare Question hai !!! solve it");
});

// app.listen() - http module ke server.listen() jaisa
// port 3000 par server activate karta hai
app.listen(3000, () => {
    console.log("Express Server Chal Raha Hai: http://localhost:3000");
})