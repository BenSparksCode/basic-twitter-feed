import {useState} from 'react'

const App = () => {
  const [result, setResult] = useState("Nothing yet...")

  const testServer = () => {
    console.log("Testing...");
  }

  return (
    <div className="App">
        <button onClick={testServer}>Test Server</button>
        <h2>Server response</h2>
        <p>{result}</p>
    </div>
  );
}

export default App;
