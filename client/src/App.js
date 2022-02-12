import './styles/App.css';
import { useState, useEffect } from 'react';
import Client from './services/api';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './misc/Header';
import Home from './misc/Home';
import SignUp from './authComponents/SignUp';
import LogIn from './authComponents/LogIn';
import HouseholdForm from './profile/HouseholdForm';
import Chores from './chores/Chores';
import Profile from './profile/Profile';
import About from './misc/About';
import { CheckSession } from './services/Auth';
import ProtectedRoute from './authComponents/ProtectedRoutes';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [household, setHousehold] = useState({});
  const [chores, setChores] = useState([]);

  const history = useHistory();

  const handleLogOut = () => {
    setAuthenticated(false);
    setAuthUser(null);
    setUser(null);
    setHousehold({});
    setChores([]);
    localStorage.clear();
  };

  const getHousehold = async (householdId) => {
    await Client.get(`/households/${householdId}`).then((res) => {
      setHousehold(res.data);
      const prioritizedChores = res.data.chores.sort((a, b) => {
        return a.priority - b.priority;
      });
      setChores(prioritizedChores);
      history.push('/');
    });
  };

  const getUser = async (userId) => {
    await Client.get(`/users/${userId}`).then((res) => {
      setUser(res.data);
      if (res.data.household_id) {
        getHousehold(res.data.household_id);
      } else {
        history.push('/household');
      }
    });
  };

  const getUserInfo = async () => {
    await Client.get('/api/users/me').then((res) => {
      getUser(res.data.id);
      setAuthUser(res.data);
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

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header
          authenticated={authenticated}
          user={user}
          handleLogOut={handleLogOut}
        />
      </header>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <Home {...props} user={user} />}
          />
          <Route path="/signup" component={SignUp} />
          <Route
            path="/login"
            component={(props) => (
              <LogIn
                {...props}
                setAuthenticated={setAuthenticated}
                setAuthUser={setAuthUser}
                getUserInfo={getUserInfo}
                user={user}
              />
            )}
          />
          <Route
            path="/household"
            component={(props) => (
              <HouseholdForm {...props} user={user} getUser={getUser} />
            )}
          />
          <Route
            path="/chores"
            component={(props) => (
              <Chores
                {...props}
                chores={chores}
                user={user}
                household={household}
                getHousehold={getHousehold}
              />
            )}
          />
          <Profile path="/profile" user={user} getHousehold={getHousehold} />
          <About path="/about" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
