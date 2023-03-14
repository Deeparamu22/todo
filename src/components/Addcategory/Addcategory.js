import React, { useState } from 'react'
import style from './Addcategory.module.css'

export default function Addcategory(props) {
  const [Addcategory,setAddcategory]=useState("")
  const handleChange=(a)=>{
    if(Addcategory!=="")
    {
      props.setaddCat(!props.addCat);
      props.setcurrentvalue(true);
      props.handleinputvalue(Addcategory);
    }
  }
  return (
    <div className={style.whole}>
        <p className={style.delete}>Creage new category</p>
        <input type={'text'} className={style.input} placeholder="input here." onChange={(e)=>setAddcategory(e.target.value)}/>
        <div className={style.deletebox}>
            <div className={style.cancel}  onClick={()=>props.setaddCat(!props.addCat)}>CANCEL</div>
            <div className={style.delete1} onClick={(event)=>handleChange(event,this)}>Save</div>
        </div>
    </div>
  )
}
