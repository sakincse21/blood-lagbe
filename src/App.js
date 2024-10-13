import './App.css';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import BecomeDonor from './components/BecomeDonor/BecomeDonor';

function App() {
  return (
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
  );
}

export default App;
