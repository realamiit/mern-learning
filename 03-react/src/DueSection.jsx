// shortr use "rafc"to make structure jsx
import React from 'react'

const DueSection = ({ questions, title, onDelete }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            {q.questionName} — {q.topic} — {q.difficulty}
            <button onClick={() =>onDelete(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DueSection
