import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import SampleR1 from './sample1';
import SampleR2 from './sample2';
import SampleR3 from './sample3';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app-layout">
       <p>React Crystis Samples </p>
          <Router>
          <nav>
            <Link to="/samplesreact/sampler1">Sample1 </Link> | <Link to="/samplesreact/sampler2">Sample2</Link> | <Link to="/samplesreact/sampler3">Sample3</Link>
            <hr></hr>
          </nav>
          <Routes>
             
              <Route path="/samplesreact/" element={<SampleR1 />} />
              <Route path="/samplesreact/sampler1" element={<SampleR1 />} />
              <Route path="/samplesreact/sampler2" element={<SampleR2 />} />
              <Route path="/samplesreact/sampler3" element={<SampleR3 />} />
              
            </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
