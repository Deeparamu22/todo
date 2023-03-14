import React from 'react'
import style from './Welcome.module.css'
import {Link } from 'react-router-dom';
import Buttons from '../Buttons/Buttons';
export default function Welcome() {
  return (
    <div className={style.welcome}>
        <p className={style.hii}>Hii, Welcome to </p>
        <p className={style.Let}>Let's Do</p>
        <p className={style.Explore}>Explore the app,Let's make to do <br></br>list with Let's Do</p>
        <div className={style.image}></div>
        <Link to='/contact' style={{ textDecoration: 'none' }}><Buttons name="GET STARTED"/></Link>
    </div>
  )
}
