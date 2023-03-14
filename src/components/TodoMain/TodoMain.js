import React from 'react'
import Header from '../Header/Header'
import Nextwelcome from '../Nextwelcome/Nextwelcome'
import Welcome from '../Welcome/Welcome'
import style from './TodoMain.module.css'
import {  Routes, Route } from "react-router-dom";
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Sidebar from '../Sidebar/Sidebar'

export default function TodoMain() {
  return (
    <div className={style.whole}>
        <Sidebar/>
        {/* <Routes>
        <Route path='/contact' element={} />
        </Routes> */}
        {/* <Header/> */}
        {/* <Routes> */}
            {/* <Route exact path='/' element={<Welcome/>}/>
            <Route path='/contact' element={<Nextwelcome/>}/> */}
            {/* <Route path='/Signup' element={<Signup/>}/>
            <Route path='/Login' element={<Login/>}/> */}
      {/* </Routes> */}
      <div>
      <div className={style.styleCircle1}></div>
      <div className={style.styleCircle2}></div>
      </div>
    </div>
  )
}