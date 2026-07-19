import React from 'react'

const QuestionForm = ({questionName, setQuestionName, topic, setTopic, difficulty, setDifficulty, handleSubmit, link, setLink}) => {
  return (
    <div>
      <input placeholder="Question Name" value={questionName} onChange={(e) => setQuestionName(e.target.value)} />
      <input placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      <input placeholder="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
      <input placeholder='Question Url'  value={link} onChange={(e) => setLink(e.target.value)} />  
      <button onClick={handleSubmit}>Add Question</button>

    </div>
  )
}

export default QuestionForm
