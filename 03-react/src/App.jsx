import { useState, useEffect } from "react";
import "./App.css"; // Import the stylesheet
// import DueSection from './components/DueSection'  //  import from DueSection.jsx
import DueSection from "./DueSection";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [link, setLink] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [dueQuestions, setDueQuestions] = useState({
    due3: [],
    due7: [],
    due15: [],
    due30: [],
    dueCustom: [],
  });

  const [customDaysInput, setCustomDaysInput] = useState({});

  // ===== useEffect — sab yahan, return se pehle =====
  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  // due 3
  useEffect(() => {
    fetch("http://localhost:3000/questions/due3")
      .then((res) => res.json())
      .then((data) => {
        setDueQuestions((prev) => ({ ...prev, due3: data }));
      });
  }, []);

  // due 7
  useEffect(() => {
    fetch("http://localhost:3000/questions/due7")
      .then((res) => res.json())
      .then((data) => {
        setDueQuestions((prev) => ({ ...prev, due7: data }));
      });
  }, []);

  // due 15
  useEffect(() => {
    fetch("http://localhost:3000/questions/due15")
      .then((res) => res.json())
      .then((data) => {
        setDueQuestions((prev) => ({ ...prev, due15: data }));
      });
  }, []);

  // due 30

  useEffect(() => {
    fetch("http://localhost:3000/questions/due30")
      .then((res) => res.json())
      .then((data) => {
        setDueQuestions((prev) => ({ ...prev, due30: data }));
      });
  }, []);

  // -------
  useEffect(() => {
    fetch("http://localhost:3000/questions/dueCustom")
      .then((res) => res.json())
      .then((data) => {
        setDueQuestions((prev) => ({ ...prev, dueCustom: data }));
      });
  }, []);

  
  // ===== HandleSubmit FUNCTIONS — return se pehle =====

  function handleSubmit() {
    fetch("http://localhost:3000/questions/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionName, topic, difficulty, link }),
    })
      .then(() => {
        // form clear karo
        setQuestionName("");
        setTopic("");
        setDifficulty("");
        setLink("");
        // list refress hoga
        return fetch("http://localhost:3000/questions");
      })
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }

  // ======== DeletQuestion Function=====

  const deleteQuestion = (id) => {
    fetch(`http://localhost:3000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        // yhaaaan delete ke baad ka process hain , sari listes ko refress kiye hai -- parallely
        fetch("http://localhost:3000/questions")
          .then((res) => res.json())
          .then((data) => setQuestions(data));
        fetch("http://localhost:3000/questions/due3")
          .then((res) => res.json())
          .then((data) => setDueQuestions((prev) => ({ ...prev, due3: data })));
        fetch("http://localhost:3000/questions/due7")
          .then((res) => res.json())
          .then((data) => setDueQuestions((prev) => ({ ...prev, due7: data })));
        fetch("http://localhost:3000/questions/due15")
          .then((res) => res.json())
          .then((data) =>
            setDueQuestions((prev) => ({ ...prev, due15: data })),
          );
        fetch("http://localhost:3000/questions/due30")
          .then((res) => res.json())
          .then((data) =>
            setDueQuestions((prev) => ({ ...prev, due30: data })),
          );
      })
      .catch((err) => console.error("Delete Error:", err));
  };

  const setCustomDays = (id) => {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ revisionAfterDays: customDaysInput[id] }),
    })
      .then(() => {
        fetch("http://localhost:3000/questions/dueCustom")
          .then((res) => res.json())
          .then((data) =>
            setDueQuestions((prev) => ({ ...prev, dueCustom: data })),
          );
      })
      .catch((err) => console.error("Set Days Error:", err));
  };

  // ===== RETURN — sirf JSX yahan, koi declaration nahi =====
  return ( 
    <div className="container">
      <h1>DSA Tracker</h1>
      {/* Add Question Form */}
      <div className="card">
      <QuestionForm
        questionName={questionName}
        setQuestionName={setQuestionName}
        topic={topic}
        setTopic={setTopic}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        handleSubmit={handleSubmit}
        link={link}
        setLink={setLink}
      />
      </div>
      {/* All Questions List */}
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            {q.questionName} — {q.topic} — {q.difficulty} 
            <a href={q.link} target="_blank">
              <img src="/LeetCode_logo_rvs.png" alt="LeetCode" width="20" />
            </a>
            <input
              type="number"
              placeholder="Days"
              value={customDaysInput[q._id] || ""}
              onChange={(e) =>
                setCustomDaysInput((prev) => ({
                  ...prev,
                  [q._id]: e.target.value,
                }))
              }
            />
            <button onClick={() => setCustomDays(q._id)}>Set</button>
          </li>
        ))}
      </ul>

      {/* Due Questions Dashboard approx 34 line of code convert into 4 line of code */}

      <DueSection
        questions={dueQuestions.due3}
        title="Due in 3 days"
        onDelete={deleteQuestion}
      />
      <DueSection
        questions={dueQuestions.due7}
        title="Due in 7 days"
        onDelete={deleteQuestion}
      />
      <DueSection
        questions={dueQuestions.due15}
        title="Due in 15 days"
        onDelete={deleteQuestion}
      />
      <DueSection
        questions={dueQuestions.due30}
        title="Due in 30 days"
        onDelete={deleteQuestion}
      />
      <DueSection
        questions={dueQuestions.dueCustom}
        title="Custom Revision Questions"
        onDelete={deleteQuestion}
      />
    </div>
  );
}

export default App;

//  summery for understanding
// Key rule jo yaad rakhna: React component ke andar 3 zones hote hain, hamesha isi order mein —
// 1. State + useEffect + functions (return se pehle)
// 2. return(...) — sirf JSX, koi const/useState/useEffect yahan nahi ja sakta
// 3. export default
