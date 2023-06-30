import './App.css';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/home';
import About from './components/about';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-container" style={{ backgroundColor: 'rgb(29, 29, 29)' }}>
    <Router>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/about"  element={<About />}/>
        <Route path="/services" element={<Home/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
