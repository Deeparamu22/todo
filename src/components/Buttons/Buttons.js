import React from 'react'
import style from './Buttons.module.css'

export default function Buttons(props) {
  return (
    <div className={style.Buttonwholediv}>
        <div className={style.buttons+" "+style[props.color]}>{props.name}</div>
    </div>
  )
}
