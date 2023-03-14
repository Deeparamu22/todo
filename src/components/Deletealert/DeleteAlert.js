import React from 'react'
import style from './DeleteAlert.module.css'

export default function DeleteAlert(props) {
  return (
    <div className={style.whole}>
        <p className={style.delete}>Delete Task?</p>
        <div className={style.deletebox}>
            <div className={style.cancel}  onClick={(event)=>{props.handledeletediv(event,this)}}>CANCEL</div>
            <div className={style.delete1} onClick={()=>{props.handleDelete()}}>DELETE</div>
        </div>
    </div>
  )
}
