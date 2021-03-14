import { useState, useContext } from 'react'

import { AppContext } from './contexts/AppContext'

import { SelectUser } from './components/SelectUser'
import { Feed } from './components/Feed'

const App = () => {
  const { users } = useContext(AppContext)


  return (
    <div className="App">
        <SelectUser />
        <Feed />
      {/* <button onClick={testServer}>Test Server</button>
      <h2>Server response</h2>
      <p>{users}</p> */}
    </div>
  );
}

export default App;
