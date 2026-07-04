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
    <ul>
      {questions.map((q) => (  // JSX me array ke hr element ke liye <li> list render kro 
        <li key = {q.id}>         
          {q.questionName} - {q.topic} - {q.difficulty}
        </li>
      ))}
    </ul> 

    {/* <ul>
  {questions.map((q) => (
    <li key={q.id} className="question-item">
      <div>
        <h3>{q.questionName}</h3>
        <p>📚 {q.topic}</p>
        <p>⭐ {q.difficulty}</p>
      </div>

      <div className="buttons">
        <button>Solve</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </li>
  ))}
</ul> */}
   </div> 
  )
}

export default App
