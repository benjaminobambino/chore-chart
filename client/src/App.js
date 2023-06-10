import './styles/App.css';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Client from './services/api';
import { CheckSession } from './services/Auth';
import Header from './misc/Header';
import Home from './misc/Home';
import SignUp from './authComponents/SignUp';
import LogIn from './authComponents/LogIn';
import HouseholdForm from './profile/HouseholdForm';
import Chores from './chores/Chores';
import Household from './profile/Household';
import About from './misc/About';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [household, setHousehold] = useState({});
  const [chores, setChores] = useState([]);
  const [quote, setQuote] = useState({});

  const history = useHistory();

  const handleLogOut = () => {
    setAuthenticated(false);
    setUser(null);
    setHousehold({});
    setChores([]);
    localStorage.clear();
  };

  const getHousehold = async (householdId) => {
    await Client.get(`/households/${householdId}`).then((res) => {
      setHousehold(res.data);
      const idOrderedChores = res.data.chores.sort((a, b) => {
        return a.id - b.id;
      });
      const prioritizedChores = idOrderedChores.sort((a, b) => {
        return a.priority - b.priority;
      });
      setChores(prioritizedChores);
    });
  };

  const getUser = async (userId) => {
    await Client.get(`/users/${userId}`).then((res) => {
      setUser(res.data);
      if (res.data.household_id) {
        getHousehold(res.data.household_id);
      } else {
        history.push('/joinhousehold');
      }
    });
  };

  const getUserInfo = async () => {
    await Client.get('/api/users/me/').then((res) => {
      getUser(res.data.id);
      setAuthenticated(true);
    });
  };

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await CheckSession().then(() => {
        getUserInfo();
      });
    }
  };

  const getQuotes = async () => {
    await axios.get('https://type.fit/api/quotes').then((res) => {
      setQuote(res.data[Math.floor(Math.random() * res.data.length - 1)]);
    });
  };

  useEffect(() => {
    checkToken();
    getQuotes();
    setInterval(CheckSession, 240000);
  }, []);

  return (
    <div className="App">
      <Header
        authenticated={authenticated}
        user={user}
        handleLogOut={handleLogOut}
      />
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <Home {...props} user={user} quote={quote} />}
          />
          <Route path="/signup" component={SignUp} />
          <Route
            path="/login"
            component={(props) => (
              <LogIn
                {...props}
                setAuthenticated={setAuthenticated}
                getUserInfo={getUserInfo}
                user={user}
              />
            )}
          />
          <Route
            path="/joinhousehold"
            component={(props) => (
              <HouseholdForm {...props} user={user} getUser={getUser} />
            )}
          />
          <Route
            path="/chores"
            render={(props) => (
              <Chores
                {...props}
                chores={chores}
                user={user}
                household={household}
                getHousehold={getHousehold}
              />
            )}
          />
          <Route
            path="/household"
            component={(props) => (
              <Household
                {...props}
                users={household.users}
                name={household.name}
                currentUser={user}
                getHousehold={getHousehold}
                household={household}
              />
            )}
          />
          <Route path="/about" component={About} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
