import './App.css';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import BecomeDonor from './components/BecomeDonor/BecomeDonor';
import { createContext, useState } from 'react';
import Profile from './components/Profile/Profile';
import { useJwt } from "react-jwt";

const token = localStorage.getItem('token');

export const UserContext = createContext();

function App() {
  const { decodedToken, isExpired } = useJwt(token);
  const [loginEmail, setLoginEmail] = useState("");
  const [isDonor, setIsDonor] = useState(false);
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={[loginEmail, setLoginEmail, decodedToken, isExpired, isDonor, setIsDonor, user, setUser]}>
      <div className="App">
        <Router>
          <Header></Header>
          <Routes>
            <Route Component={BecomeDonor} path='/BecomeDonor' />
            <Route element={<Profile />} path='/profile' />
            <Route Component={Home} path='/'></Route>
            <Route Component={Home} path='/*'></Route>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
