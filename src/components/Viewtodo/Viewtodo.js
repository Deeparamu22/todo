import React, { useState,useEffect,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {faNoteSticky} from '@fortawesome/free-solid-svg-icons'
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faClock} from '@fortawesome/free-solid-svg-icons'
import {faFlag} from '@fortawesome/free-solid-svg-icons'
import style from './Viewtodo.module.css'
import { useParams } from 'react-router-dom'

export default function Viewtodo(props) {
  let i=0;
  let parts ;
  let options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const selectref = useRef(null);
  const [withcheck,setwithcheck]=useState({task:"",check:false});
  const [element,setelement]=useState(false);
  const [flag,setflag]=useState(false);
  const [date,setdate]=useState(props.value[0].date);
  const [time,settime]=useState(props.value[0].time);
  const [time1,settime1]=useState('');
  const [showpriorty,setshowpriorty]=useState(false);
  const [Class,setclass]=useState('gray');
  const id=useParams();
  const handleElement=(e)=>{
    let r=JSON.parse(props.value[0].todo)
    if(e.target.parentElement.children[0].value!=="")
    {
      r.push(withcheck)
      setflag(true);
      props.savesubtodo(props.value[0].id,r);
    }
    e.target.parentElement.children[0].value="";
  }
  const datetimeset=async()=>{
    await fetch (`http://localhost:5998/datetime/${id.id}/${props.value[0].id}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({time:time,date:date})
    })
    .then((response) => {return response.json()})
    .then((data) => { 
      settime(data[0].time)
      setdate(data[0].date)
    });
  }
  useEffect(() => {
    
    if(date!==''||time!==''){
      datetimeset();
    }
    let date1 ;
    if(date!=''){
      date1 = new Date(date);
    }
    else{
      date1=new Date();
    }
const date2 = new Date();
if (date1.getTime() < date2.getTime()) {
  setclass('red');
} else if (date1.getTime() > date2.getTime()) {
  setclass('gray');
}
    selectref.current.value=props.category;
    if(time!==''){
      parts = time.split(':')
      date1.setHours(parseInt(parts[0], 10));
      date1.setMinutes(parseInt(parts[1], 10));
      settime1(date1.toLocaleString('en-US', options));
    }
  }, [flag,props,date,time])

  const handleChange=(e)=>{
    if(e.target.value==="3")
    {
      props.setaddCat(!props.addCat);
      props.setcurrentvalue(false);
    }
    props.handleinputvalue(e.target.value);
  }

  const subtaskcheck=(e)=>{
    const todoObj = JSON.parse(props.value[0].todo);
    if (todoObj.hasOwnProperty(e.target.id)) {
      todoObj[e.target.id].check = true;
      props.savesubtodo(props.value[0].id,todoObj);
      }
  }

  const subtaskDeletefun=(e)=>{
    let id;
    if(e.target.parentElement.id===''){
      id=e.target.id
    }
    else{
      id=e.target.parentElement.id;
    }
    const todoObj = JSON.parse(props.value[0].todo);
    todoObj.splice(id,1);
    props.savesubtodo(props.value[0].id,todoObj);
  }

  const handlepriorty=(e)=>{
    props.handlepriorty(e.target.value);
  }
  return (
    <div className={style.whole}>
        <div className={style.head1}>
          <div className={style.head}>
          <FontAwesomeIcon icon={faArrowLeft} className={style.icon} onClick={()=>props.handleflag()}/>
          <h1>{props.value[0].TaskName}</h1>
          <div>
          <select className={style.custom} onChange={handleChange} ref={selectref} defaultValue={props.value[0].Category}>
          <option value="No Category">No Category</option> 
            {
              props.catValue.map(a=><option value={a} key={a}>{a}</option>)
            }
            <option value="3">+ Add Category</option> getMinutes
          </select>
          </div>
          <div className={style.wholewidth}>
          {(props.category!=='')?<div className={style.priortysmalldiv}>{props.category}</div>:null}
          {(props.priorty!=='')?<div className={style.priortysmalldiv}>{props.priorty}</div>:null}
          {(date!=='')?<p className={style.datetime+" "+style[Class]}>{`${new Date(date).getDate()}-${new Date(date).getMonth() + 1}-${new Date(date).getFullYear()}`}   </p>:null}
          <p className={style.datetime+" "+style[Class]}>{time1}</p>
          </div>
          </div>
          <div className={style.sideDiv}>
          <FontAwesomeIcon icon={faBell} className={style.icons} title="attachments" onClick={()=>props.setreminderPopup(!props.reminderPop)}/>
          <FontAwesomeIcon icon={faNoteSticky} className={style.icons} title="notes" onClick={()=>props.setshownote(!props.shownote)}/>
          <FontAwesomeIcon icon={faCalendarDays} className={style.icons}  title="Duedate"/><input type={'date'} onChange={(e)=>setdate(e.target.value)} className={style.inputdate}/>
          <FontAwesomeIcon icon={faClock} className={style.icons}  title="set Time"/><input type={'time'} onChange={(e)=>settime(e.target.value)} className={style.inputtime}/>
          <FontAwesomeIcon icon={faFlag} className={style.icons} onClick={()=>setshowpriorty(!showpriorty)}/>
          {(showpriorty)?(<div className={style.priortydiv}>
            <label  className={style.radiolabel} style={(props.priorty==='High') ? {border: '2px solid red'} : {border: 'none'}}><input type={'radio'}  className={style.radiobtn} name="priorty" value="High" onClick={handlepriorty}/>
            <div className={style.priortysmalldiv+" "+style.high} >High</div></label>
            <label  className={style.radiolabel} style={(props.priorty==='Medium') ? {border: '2px solid #ffc400'} : {border: 'none'}}><input type={'radio'}  className={style.radiobtn} name="priorty" value="Medium"  onClick={handlepriorty}/><div className={style.priortysmalldiv+" "+style.medium} >Medium</div></label>
            <label  className={style.radiolabel} style={(props.priorty==='Low') ? {border: '2px solid green'} : {border: 'none'}}><input type={'radio'}  className={style.radiobtn} name="priorty" value="Low" onClick={handlepriorty} /><div className={style.priortysmalldiv+" "+style.low} >Low</div></label>
            </div>):null}
          </div>
          </div>
          <div className={style.main}>
              <div className='flexClass'>
                Sub Tasks
              </div>
              <p>Notes</p>
              {/* <p>Attachments</p> */}
              <div className={style.smallDiv}>
                {
                  JSON.parse(props.value[0].todo).map(a=>{
                    return <div className={style.subtaskDiv}><input type={"checkbox"} className={style.Checkbox} id={i++} checked={a.check?true:false} onClick={subtaskcheck}/> <p className={style.subtaSK+" "+style[a.check]} title={a.task}>{a.task}</p><FontAwesomeIcon icon={faTrash} className={style.delete} id={i-1} onClick={subtaskDeletefun}/></div>
                  })
                }
                {(element)?<div className={style.subtaskInputDiv}><input type={"text"} className={style.subtaskInput} onChange={(e)=>setwithcheck({task:e.target.value,check:false})}/><button onClick={handleElement}>	&#10004;</button></div>:null}
                <div className={style.addTask}><p className={style.para} onClick={()=>setelement(true)}>+Add Task Name</p></div>
              </div>
              <div className={style.smallDiv}>
                <h3 className={style.title}>{props.value[0].title}</h3>
                <textarea value={props.value[0].Notes} className={style.text} disabled={true}></textarea>
              </div>
              {/* <div className={style.smallDiv}></div> */}
          </div>
    </div>
  )
}