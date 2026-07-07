import { useState, useEffect } from 'react'

function App() {
  const [questions, setQuestions] = useState([])
  const [questionName, setQuestionName] = useState('')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
  }, [])



  const [dueQuestions, setDueQuestions] = useState({
  due3: [], due7: [], due15: [], due30: []
});


//  due 3
  useEffect(() => {
  fetch('http://localhost:3000/due3')
    .then((res) => res.json())
    .then((data) => {
      setDueQuestions(prev => ({ ...prev, due3: data }));
    });
}, []);
// due 7
 useEffect(() => {
  fetch('http://localhost:3000/due7')
    .then((res) => res.json())
    .then((data) => {
      setDueQuestions(prev => ({ ...prev, due7: data }));
    });
}, []);

// due 15
 useEffect(() => {
  fetch('http://localhost:3000/due15')
    .then((res) => res.json())
    .then((data) => {
      setDueQuestions(prev => ({ ...prev, due15: data }));
    });
}, []);

// due 30
 useEffect(() => {
  fetch('http://localhost:3000/due30')
    .then((res) => res.json())
    .then((data) => {
      setDueQuestions(prev => ({ ...prev, due30: data }));
    });
}, []);




  function handleSubmit() {
    fetch('http://localhost:3000/questions/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionName, topic, difficulty })
    })

      .then(() => {
        // form clear karo
        setQuestionName('')
        setTopic('')
        setDifficulty('')
        // list refress hoga 
        return fetch('http://localhost:3000/questions')
      })
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      
  }

  return (
    <div>
      <h1>DSA Tracker</h1>
      
      {/* Add Question Form  */}
      <div>
        <input 
          placeholder="Question Name"
          value={questionName}
          onChange={(e) => setQuestionName(e.target.value)}
        />
        <input 
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input 
          placeholder="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <button onClick={handleSubmit}>Add Question</button> // button to submit the form
      </div>

      {/* Questions List */}
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            {q.questionName} — {q.topic} — {q.difficulty}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App