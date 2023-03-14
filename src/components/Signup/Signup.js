import React from 'react'
import Buttons from '../Buttons/Buttons'
import Inputs from '../Inputs/Inputs'
import style from './Signup.module.css'

export default function Signup() {
  return (
    <div className={style.wholecontainer1}>
        <h1>SIGN UP FORM</h1>
        <Inputs/>
        <Inputs/>
        <Inputs/>
        <Buttons name="GET STARTED" color="blueviolet"/>
    </div>
  )
}
