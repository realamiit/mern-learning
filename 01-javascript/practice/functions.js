// ========FUNCTION IN JS=======
  
// function Declear  basics declearation

function calculateNextRevision (){
    // function ke andar ka variable — sirf yahan accessible
    let nextData = "DAY 3";
    console.log(nextData);
}


//  function banaane ka mtlb - vo khud se chlta nhi hai 
// usko call krna padta hai yani "bulaoo isko"

calculateNextRevision();

// ye function ko fir se call kr skte hooo -- jitni baar chahooo
calculateNextRevision();
calculateNextRevision();

// ye niche wali line ERROR dega - kyuki ye function ke undr declear to hai but baher accessible nhi hai 
console.log(nextData);

