import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Personal from './components/Personal';
import Education from './components/Education';
import Job from './components/Job';
import All from './components/All';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Personal/>}/>
        <Route path='/education' element={<Education/>}/>
        <Route path='/job' element={<Job/>}/>
        <Route path='/alldetails' element={<All/>}/>
      </Routes>
    </Router>
  );
}

export default App;
