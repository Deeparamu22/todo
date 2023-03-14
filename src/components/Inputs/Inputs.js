import React from 'react'
import style from './Inputs.module.css'

export default function Inputs(props) {
  return (
    <div><input type={props.Type} className={style.inputDiv}/></div>
  )
}
