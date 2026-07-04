import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [questions, setQuestions] = useState([])  //empty array initially

  useEffect(() => {
    // components load hone pe peheli baar ye chlega 
    fetch('http://localhost:3000/questions')
    .then((res) => res.json())
    .then((data) => {
      setQuestions(data)  //backend se aaya data state mein store karo
    
    })
  }, []) // sirf eeek baar run krega 
  
  return (
   <div>
    <h1>DSA Tracker</h1>
    <p>Total Questions: {questions.length}</p>
    <button>See Questions</button>
   </div> 
  )
}

export default App
