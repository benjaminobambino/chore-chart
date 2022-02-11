import './styles/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch } from 'react-router-dom';
import Header from './misc/Header';
import Chores from './chores/Chores';
import Profile from './profile/Profile';
import About from './misc/About';

function App() {
  const [household, setHousehold] = useState({});
  const [user, setUser] = useState({});
  const [chores, setChores] = useState([]);

  const authUser = process.env.REACT_APP_USERNAME;
  const authPassword = process.env.REACT_APP_PASSWORD;

  const getHousehold = async () => {
    const res = await axios.get(`http://localhost:8000/households/1`, {
      auth: {
        username: authUser,
        password: authPassword
      }
    });
    setHousehold(res.data);
    setUser(res.data.users[0]);
    const prioritizedChores = res.data.chores.sort((a, b) => {
      return a.priority - b.priority;
    });
    setChores(prioritizedChores);
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
          <Chores
            exact
            path="/chores"
            chores={chores}
            user={user}
            household={household}
            getHousehold={getHousehold}
          />
          <Profile path="/profile" user={user} getHousehold={getHousehold} />
          <About path="/about" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
