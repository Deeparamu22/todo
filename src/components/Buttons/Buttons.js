import React from 'react'
import style from './Buttons.module.css'

export default function Buttons(props) {
  return (
    <div className={style.Buttonwholediv} onClick={()=>props.handleClick()}>
        <div className={style.buttons+" "+style[props.color]+" "+style[props.loginbuttonclass]}>{props.name}</div>
    </div>
  )
}
