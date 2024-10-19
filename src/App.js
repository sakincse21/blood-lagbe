import './App.css';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import BecomeDonor from './components/BecomeDonor/BecomeDonor';
import { createContext, useState } from 'react';
import Profile from './components/Profile/Profile';

export const UserContext = createContext();

function App() {
  const [clientDecodedToken, setClientDecodedToken]=useState('');
  const [checkExpired, setCheckExpired]=useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [isDonor, setIsDonor] = useState(false);
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={[loginEmail, setLoginEmail, clientDecodedToken, setClientDecodedToken, checkExpired, setCheckExpired, isDonor, setIsDonor, user, setUser]}>
      <div className="App">
        <Router>
          <Header></Header>
          <Routes>
            <Route Component={BecomeDonor} path='/BecomeDonor' />
            <Route element={<Profile></Profile>} path='/profile' />
            <Route Component={Home} path='/' />
            <Route Component={Home} path='/*' />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
