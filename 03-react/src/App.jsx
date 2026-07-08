import { useState, useEffect } from 'react'

function App() {
  const [questions, setQuestions] = useState([])
  const [questionName, setQuestionName] = useState('')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('')
   const [dueQuestions, setDueQuestions] = useState({
    due3: [], due7: [], due15: [], due30: []
  })


  // ===== useEffect — sab yahan, return se pehle =====
  useEffect(() => {
    fetch('http://localhost:3000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
  }, [])


    // due 3
 useEffect(() => {
  fetch('http://localhost:3000/questions/due3')
    .then((res) => res.json())
    .then((data) => {
      setDueQuestions(prev => ({ ...prev, due3: data }));
    });
}, []);

  // due 7
 useEffect(() => {
  fetch('http://localhost:3000/questions/due7')
    .then((res) => res.json())
    .then((data) => {
      setDueQuestions(prev => ({ ...prev, due7: data }));
    });
}, []);

// due 15
 useEffect(() => {
  fetch('http://localhost:3000/questions/due15')
    .then((res) => res.json())
    .then((data) => {
      setDueQuestions(prev => ({ ...prev, due15: data }));
    });
}, []);


// due 30

useEffect(() => {
  fetch('http://localhost:3000/questions/due30')
    .then((res) => res.json())
    .then((data) => {
      setDueQuestions(prev => ({ ...prev, due30: data }));
    });
}, []);

// function  return ke baad  for Due3

const showDue3Questions = async () => {
  console.log("Clicked");

  const res = await fetch("http://localhost:3000/questions/due3");
  const data = await res.json();

  console.log(data);

  setDueQuestions((prev) => ({
    ...prev,
    due3: data,
  }));
};
// For Due7
const showDue7Questions = async () => {
  console.log("Clicked");

  const res = await fetch("http://localhost:3000/questions/due7");
  const data = await res.json();

  console.log(data);

  setDueQuestions((prev) => ({
    ...prev,
    due7: data,
  }));
};

// For Due15

// function  return ke baad 

const showDue15Questions = async () => {
  console.log("Clicked");

  const res = await fetch("http://localhost:3000/questions/due15");
  const data = await res.json();

  console.log(data);

  setDueQuestions((prev) => ({
    ...prev,
    due15: data,
  }));
};

// For Due30
const showDue30Questions = async () => {
  console.log("Clicked");

  const res = await fetch("http://localhost:3000/questions/due30");
  const data = await res.json();

  console.log(data);

  setDueQuestions((prev) => ({
    ...prev,
    due30: data,
  }));
};



// ===== FUNCTIONS — return se pehle =====

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

  // ======== DeletQuestion Function=====

const deleteQuestion = (id) => {
  fetch(`http://localhost:3000/questions/${id}`, { method: "DELETE" })
    .then(() => {
      return  fetch("http://localhost:3000/questions");
    })
    .then((res) => res.json())
    .then((data) => setQuestions(data))
    .catch((err) => console.error("Delete Error:",err));
};
 
  // ===== RETURN — sirf JSX yahan, koi declaration nahi =====
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

      {/* All Questions List */}
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            {q.questionName} — {q.topic} — {q.difficulty}
          </li>
        ))}
      </ul>

       {/* Due Questions Dashboard */}

       <h2 onClick={showDue3Questions}>Due in 3 days</h2>
      <ul>
        {dueQuestions.due3.map((q) => (
          <li key={q._id}>{q.questionName}

          <button onClick={() => deleteQuestion(q._id)}>
            Delete
          </button>
          </li>
        ))}
      </ul>

      <h2 onClick={showDue7Questions}>Due in 7 days</h2>
      <ul>
        {dueQuestions.due7.map((q) => (
          <li key={q._id}>{q.questionName}

          <button onClick={() => deleteQuestion(q._id)}>
            Delete
          </button>
          </li>
        ))}
      </ul>

      <h2 onClick={showDue15Questions}>Due in 15 days</h2>
      <ul>
        {dueQuestions.due15.map((q) => (
          <li key={q._id}>{q.questionName}

          <button onClick={() => deleteQuestion(q._id)}>
            Delete
          </button>
          </li>
        ))}
      </ul>

      <h2 onClick={showDue30Questions}>Due in 30 days</h2>
      <ul>
        {dueQuestions.due30.map((q) => (
          <li key={q._id}>{q.questionName}

          <button onClick={() => deleteQuestion(q._id)}>
            Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App



//  summery for understanding 
// Key rule jo yaad rakhna: React component ke andar 3 zones hote hain, hamesha isi order mein —
// 1. State + useEffect + functions (return se pehle)
// 2. return(...) — sirf JSX, koi const/useState/useEffect yahan nahi ja sakta
// 3. export default