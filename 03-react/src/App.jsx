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
      
      {/* Add Question Form */}
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
        <button onClick={handleSubmit}>Add Question</button>
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