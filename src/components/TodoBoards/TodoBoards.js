import React,{useEffect,useState} from 'react'
import style from './TodoBoards.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {useParams} from "react-router-dom";

export default function TodoBoards(props) {
  
  const {id}=useParams();
  const handleCheck=async(a,e)=>{
    const result =await fetch (`http://localhost:5998/complete/${id}/${a}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({check:e.target.checked})
    })
    const resultJson=await result.json();
    console.log(resultJson);
    props.setshowBoard(resultJson)
  }

  return (
    <div>
      <div className={style.wholediv}>
        {props.showBoard.map(a=>{
                return( <div className={style.smallDiv} key={a.Description}>
                   <div className={style.first}> <p className={style.TaskName}>{a.TaskName}</p><input type={'checkbox'} className={style.checkBox} onClick={(event)=>handleCheck(a.id,event)} checked={(a.complete=='true')?true:false}/></div>
                    <p className={style.Description}>{a.Description}</p>
                    <div className={style.iconDiv}>
                    <div><FontAwesomeIcon icon={faPenToSquare} className={style.icon} onClick={(event)=>{props.handleedit(event,this)}} id={a.id}/></div>
                    <div onClick={(event)=>{props.handledeletediv(event,this)}}><FontAwesomeIcon icon={faTrash} className={style.icon+" "+style.delete} id={a.id}/></div>
                    </div>
                    </div>)
                    }
                    )
        }
        </div>
        </div>
  )
}
