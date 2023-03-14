import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import style from './Notes.module.css'

export default function Notes(props) {
  const [note,setnote]=useState({title:props.value[0].title,note:props.value[0].Notes});
  const [notes, setnotes]=useState({tablename:"",id:"",Title:props.value[0].title,Notes:props.value[0].Notes});
  const id=useParams();
  useEffect(() => {
    setnotes({...notes,tablename:id.id,id:props.value[0].id});
    setnote({...note,title:props.value[0].title,note:props.value[0].Notes});
  }, [props])   
    const [tick,settick]=useState(false);
    const handleinput=(e)=>{
        settick(true);
        setnotes({...notes,[e.target.name]:e.target.value});
    }
    const savenotes=()=>{
      props.savenotes(notes);
      settick(!tick);
    }
  return (
    <div className={style.whole}>
      <div className={style.head}>
        <input type={"text"} className={style.notestitle} placeholder={"Title"} onChange={handleinput} name="Title" defaultValue={note.title}/>
        {(tick)?<h6 onClick={(event)=>savenotes(event,this)}>&#10003;</h6>:<h6 onClick={()=>props.setshownote(!props.shownote)}>&#10005;</h6>}
      </div>
      <textarea name="Notes" rows={3} cols={2} onChange={handleinput}  defaultValue={note.note}></textarea><br></br>
    </div>
  )
}
