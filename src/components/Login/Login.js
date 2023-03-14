import React from 'react'
import { Link } from 'react-router-dom'
import Inputs from '../Inputs/Inputs'
import style from './Login.module.css'
import Buttons from '../Buttons/Buttons'

export default function Login() {
  return (
    <div className={style.wholecontainer1}>
        <h1>LOGIN FORM</h1>
        <Inputs/>
        <Inputs/>
        <Buttons name="LOGIN" color="blueviolet"/>
    </div>
  )
}
