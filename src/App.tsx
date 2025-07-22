import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import Sample1 from './sample1';
import Sample2 from './sample2';
import Sample3 from './sample3';

function App() {
  return (
    <>
     <div className="app-layout">
       <p>React Crystis Samples </p>
          <Router>
          <nav>
            <Link to="/sample1">Sample1 </Link> | <Link to="/sample2">Sample2</Link> | <Link to="/sample3">Sample3</Link>
            <hr></hr>
          </nav>
          <Routes>
              <Route path="/sample1" element={<Sample1 />} />
              <Route path="/sample2" element={<Sample2 />} />
              <Route path="/sample3" element={<Sample3 />} />
              
            </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
