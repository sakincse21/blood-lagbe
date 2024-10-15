import './App.css';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import BecomeDonor from './components/BecomeDonor/BecomeDonor';
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {
  const [loginEmail, setLoginEmail] = useState("");
  return (
    <UserContext.Provider value={[loginEmail, setLoginEmail]}>
      <div className="App">
        <Router>
          <Header></Header>
          <Routes>
            <Route Component={BecomeDonor} path='/BecomeDonor' />
            <Route Component={Home} path='/'></Route>
            <Route Component={Home} path='/*'></Route>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
