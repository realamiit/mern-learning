import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

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
