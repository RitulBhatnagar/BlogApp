
// import SinglePost from './singlePost/SinglePost';
import Single from './pages/Single/Single';
import Setting from './pages/settings/Setting';
import Write from './pages/write/Write';
import Login from "./pages/login/Login"
// import { Router } from "express";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Route } from "react-router";
import Register from "./pages/register/Register"
import TopBar from './TopBar/TopBar';
import Home from "./pages/Home/Home"
// import {Switch} from "express"
import "./style.css"
import { useContext } from 'react';
import { Context } from './context/Context';
function App() {
  const {user} = useContext(Context);
  return (
    <BrowserRouter>
    <TopBar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register/*" element={user ? <Home/> : <Register />} />
      <Route path="login/*" element={user ? <Home/> : <Login />}></Route>
      <Route path="write/*" element={user ? <Write/> : <Register />}></Route>
      <Route path="setting/*" element={user ? <Setting/> : <Register />}></Route>
      <Route path="post/:postid" element={<Single/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

