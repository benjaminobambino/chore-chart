import './styles/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Client from './services/api';
import { Route, Switch } from 'react-router-dom';
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
  const [profile, setProfile] = useState(null);
  const [household, setHousehold] = useState({});
  const [chores, setChores] = useState([]);

  // const authUser = process.env.REACT_APP_USERNAME;
  // const authPassword = process.env.REACT_APP_PASSWORD;

  const handleLogOut = () => {
    //Reset all auth related state and clear localstorage
    setAuthenticated(false);
    setAuthUser(null);
    setProfile(null);
    localStorage.clear();
  };

  // const checkToken = async () => {
  //   const user = await CheckSession();
  //   setAuthUser(user);
  //   setAuthenticated(true);
  // };

  const getHousehold = async (householdId) => {
    const token = localStorage.token;
    // const res = await axios.get(
    await Client.get(`/households/${householdId}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then((res) => {
      setHousehold(res.data);
      // setUser(res.data.users[0]);
      const prioritizedChores = res.data.chores.sort((a, b) => {
        return a.priority - b.priority;
      });
      setChores(prioritizedChores);
    });
  };

  const getProfile = async (userId) => {
    await Client.get(`/users/${userId}`).then((res) => {
      setProfile(res.data);
      if (res.data.household_id) {
        getHousehold(res.data.household_id);
      } else {
        console.log('no household');
      }
    });
  };

  const getUserInfo = async () => {
    const token = localStorage.token;
    await Client.get('/api/users/me', {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then((res) => {
      getProfile(res.data.id);
      setAuthUser(res.data);
      setAuthenticated(true);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      //   checkToken();
      getUserInfo();
      // getHousehold();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header
          authenticated={authenticated}
          user={profile}
          handleLogOut={handleLogOut}
        />
      </header>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <Home {...props} profile={profile} />}
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
              />
            )}
          />
          <Route
            path="/household"
            component={(props) => (
              <HouseholdForm
                {...props}
                profile={profile}
                getHousehold={getHousehold}
              />
            )}
          />
          <Route
            path="/chores"
            component={(props) => (
              <Chores
                {...props}
                chores={chores}
                // user={user}
                household={household}
                getHousehold={getHousehold}
              />
            )}
          />
          <Profile
            path="/profile" // user={user}
            getHousehold={getHousehold}
          />
          <About path="/about" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
