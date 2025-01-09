import React, { useState } from 'react'
import './App.css'
// import FruitList from './components/Fruits'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>This is my app! Hello</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {/* <FruitList /> */}
    </>
  )
}

export default App;
