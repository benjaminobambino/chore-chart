import './styles/App.css';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Client from './services/api';
import Header from './misc/Header';
import Home from './misc/Home';
import SignUp from './authComponents/SignUp';
import LogIn from './authComponents/LogIn';
import HouseholdForm from './profile/HouseholdForm';
import Chores from './chores/Chores';
import Household from './profile/Household';
import About from './misc/About';
import UserProvider from './state/UserContext';
import useAuth from './hooks/useAuth';

// have to pull this out into a separate component because callers of useAuth have to be a child of UserProvider
function LandingPage() {
  const [household, setHousehold] = useState({});
  const [chores, setChores] = useState([]);
  const [quote, setQuote] = useState({});
  const [isUserLoading, isAuthenticated, user, logout] = useAuth();

  const history = useHistory();

  const handleLogOut = () => {
    // cleanup auth
    logout();

    // other cleanup
    setHousehold({});
    setChores([]);
  };

  // leave this here for now
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

  // leave for now
  const getQuotes = async () => {
    await axios.get('https://type.fit/api/quotes').then((res) => {
      setQuote(res.data[Math.floor(Math.random() * res.data.length - 1)]);
    });
  };

  // keep this working for now
  useEffect(() => {
    getQuotes();
  }, []);

  // also keep this working for now
  // since we already have our user request in flight, we just run this useEffect to get data when we have a household_id
  useEffect(() => {
    // do nothing if no user
    if (!isAuthenticated || !user) return;

    if (user.household_id) {
      getHousehold();
    } else {
      history.push('/joinhousehold');
    }

  }, [isAuthenticated, user])

  // this could be sexier!
  if (isUserLoading) return <div>...Loading</div>

  return (
      <div className="App">
        <Header
          authenticated={isAuthenticated}
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
                  setAuthUser={setAuthUser}
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

function App() {
  return (
    <UserProvider>
      <LandingPage />
    </UserProvider>
  );
}

export default App;
