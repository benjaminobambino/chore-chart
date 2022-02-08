import './styles/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Chores from './chores/Chores';

function App() {
  // const [household, setHousehold] = useState({});

  // const getHousehold = async () => {
  //   const res = await axios.get(`http://localhost:8000/households/1`);
  //   setHousehold(res.data);
  // };

  // useEffect(() => {
  //   getHousehold();
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chore Chart</h1>
        <Chores />
      </header>
    </div>
  );
}

export default App;
