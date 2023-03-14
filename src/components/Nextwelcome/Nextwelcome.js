import React from 'react'
import style from './Nextwelcome.module.css'
import {Link } from 'react-router-dom';
import Buttons from '../Buttons/Buttons';

export default function Nextwelcome() {
  return (
<div className={style.login}>
    <div className={style.image}></div>
    <p className={style.what}>What are what we do </p>
    <p className={style.Thousands}>Thousands of people are using Let's Do<br></br> for make To Do List for better<br></br> productivity</p>
    <Link to='/Signup' style={{ textDecoration: 'none' }}><Buttons color="red" name="SIGN UP"/></Link>
    <p className={style.already}>ALREADY HAVE AN ACCOUNT ?<Link to='/Login' style={{ textDecoration: 'none' }}>LOGIN</Link></p>
</div>
  )
}
