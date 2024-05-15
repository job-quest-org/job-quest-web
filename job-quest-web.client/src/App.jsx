import React from 'react'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home  from './modules/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element="#" />
                <Route path="/contact" element="#" />
            </Routes>
        </BrowserRouter>
        );
     }
export default App
