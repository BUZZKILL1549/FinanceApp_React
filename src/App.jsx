import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Navbar from './components/navbar/Navbar.jsx';

import Dashboard from './components/pages/dashboard/Dashboard.jsx';
import Insurance from './components/pages/insurance/Insurance.jsx';
import Investments from './components/pages/investments/Investments.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/investments" element={<Investments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
