import './styles/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Header from './misc/Header';
import Chores from './chores/Chores';
import Profile from './profile/Profile';
import About from './misc/About';

function App() {
  const [household, setHousehold] = useState({});

  const getHousehold = async () => {
    const res = await axios.get(`http://localhost:8000/households/1`);
    setHousehold(res.data);
  };

  useEffect(() => {
    getHousehold();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>
        <Switch>
          <Chores exact path="/" />
          <Profile path="/profile" />
          <About path="/about" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
