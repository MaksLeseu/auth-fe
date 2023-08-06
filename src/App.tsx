import React from 'react';
import './App.css';
import {Content} from "./Content";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Login";
import {Registration} from "./Registration";
import {Header} from "./Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={'/'} element={<Content />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/registration'} element={<Registration />} />
        <Route path='*' element={<Navigate to={'/404'} />} />
        <Route path={'/404'} element={<h1>404: Page Not Found!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
