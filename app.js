// attributes=-{
//     children:"element",
//     id:"first",
//     style:{
//         fontSize:"30px",
//         backgroundColor:"orange",
//         color:"white"}
// }

// element={
//     tag:"h1",
//     textContent:"Hellow cat",
//     className:"element",
//     id:"first",
//     style:"first",
//      fontSize:"30px",
//         backgroundColor:"orange",
//         color:"white"

// }


function createElement(tag,attributes,children){

    const element = document.createElement(tag);
    element.textContent = children;

    for(const key in attributes){
        if (key=='style'){
            Object.assignO(element.style,attributes.style);
        }
    }
}

//    const element1= document.createElement("h1",{className:"element",id:"first",style:{fontSize:"30px",backgroundColor:"green"}},"Streack is lounched");
//    const element2= document.createElement("h2",{className:"element",id:"second",style:{fontSize:"30px",backgroundColor:"green"}},"Streack is lounched");

   //creat heading 

// const element1= document.createElement("h1");
//  element1.textContent = "hellow Codders";
//  element1.className = 'element';
//  element1.id = 'first';
//  element1.style.fontSize = "30px";
//  element1.style.backgroundColor = "orange";
//  element1.style.color ="white";

//  const element2= document.createElement("h2");
//  element2.textContent = "Streack is lounched";
//  element2.className = 'element';
//  element2.id = 'first';
//  element2.style.fontSize = "30px";
//  element2.style.backgroundColor = "blue";
//  element2.style.color ="pink";


const React = {
    
 createElement: (tag,attributes,children) => {

    const element = document.createElement(tag);
    element.textContent = children;

    for(const key in attributes){
        if (key=='style'){
            Object.assign(element.style,attributes.style);
          }
          else{
            element[key] = attributes[key];
          }
    }
   
    return element;
 }
}

   const element1=  React.creatElement("h1",{className:"element",id:"first",style:{fontSize:"30px",backgroundColor:"green"}},"Streack is lounched");
   const element2= React.createElement("h2",{className:"element",id:"second",style:{fontSize:"30px",backgroundColor:"green"}},"Streack is lounched");

 const root = document.getElementById('root');
 root.append(element1);
