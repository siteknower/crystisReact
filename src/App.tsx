import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import Sample1 from './sample1';
import Sample2 from './sample2';
import Sample3 from './sample3';

function App() {
  return (
    <>
     <div className="app-layout">
          <Router>
          <nav>
            <Link to="/samplesreact/sample1">Sample1 </Link> | <Link to="/samplesreact/sample2">Sample2</Link> | <Link to="/samplesreact/sample3">Sample3</Link>
            <hr></hr>
          </nav>
          <Routes>
              {/* <Route path="/" element={<h1>Home Page</h1>} /> */}
              {/* <Route path="/" element={<h1>Home Page</h1>} /> */}
              <Route path="/samplesreact/" element={<Sample1 />} />
              <Route path="/samplesreact/sample1" element={<Sample1 />} />
              <Route path="/samplesreact/sample2" element={<Sample2 />} />
              <Route path="/samplesreact/sample3" element={<Sample3 />} />
              
            </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
