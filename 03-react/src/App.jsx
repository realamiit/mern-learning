import { useState } from 'react'
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  // my hook
  

  return (
   <div>
    <h1>DSA Tracker</h1>
    <p>count: {count}</p>
    <button onClick={() => setCount(count + 1)}>
      Add 1
    </button>
    <br/>
    <button onClick={() => setCount(0)}>
      Reset
    </button>
   </div>
   
  )
}

export default App
