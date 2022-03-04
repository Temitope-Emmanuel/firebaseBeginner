import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {Box} from "@chakra-ui/react";
import Upload from './views/Upload';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Box className="d-flex" display='flex' dir='row' justifyContent='space-between' w='75%' mx='auto' my='5'>
            <Link to="/">Home</Link>
            <Link to="/upload">Upload</Link>
          </Box>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/upload" element={<Upload/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
