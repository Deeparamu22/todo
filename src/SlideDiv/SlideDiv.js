import React from 'react'
import style from './SlideDiv.module.css'

export default function SlideDiv({children,transtion1}) {
  const transformproperty=(transtion1)?{marginLeft:'-254px'}:{}
  return (
    <div className={style.whole} style={transformproperty}>{children}</div>
  )
}