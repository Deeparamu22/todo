import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import style from './ReminderPopup.module.css'

export default function ReminderPopup(props) {
    const id=useParams();
    const [username,setusername]=useState(null);
    const ref=useRef();
    const [flag,setflag]=useState(false)
    const dateref=useRef()
    const twilio=async()=>{
        
        if(/^\d{10}$/.test(ref.current.value)&&dateref.current.value!==''){
        await fetch (`http://localhost:5998/twilio/${username}/${props.value[0].TaskName}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({number:ref.current.value,time:dateref.current.value})
    })  
    .then((response) => {return response.json()})
    .then((data) => {return (data)});    
    ref.current.value='';
        dateref.current.value='';
        props.setreminderPopup(false)
}
    }
    useEffect(()=>{
        const fun=async()=>{
            const result =await fetch(`http://localhost:5998/user/${id.id}`)
        const jsonresult=await result.json();
        setusername(jsonresult[0].Username);
        }
        fun(); 
    })
    useEffect(()=>{

    },[flag])
  return (
    <div className={`${style.whole} ${(flag)?style.height:''}`}>
        <h1 className={style.xx} onClick={()=>props.setreminderPopup(false)}>X</h1>
            <h1>Reminder </h1>
            <br></br>
        <label>Phone No:<input type={'text'} autoComplete='off' className={style.number} ref={ref}/></label>
        <label>Date:<input type={'datetime-local'}  autoComplete='off' className={style.number} ref={dateref}/></label>
        {(!flag)?<button onClick={()=>setflag(!flag)} className={style.submit}>enter</button>:null}
           <div className={`${(flag)?style.display:style.transition}`}> <h3 className={style.red}>Scan the qr code for set a remainder
		Remainder works between 15 min to 7 days only</h3>
        
        <img  src='../assests/Screenshot from 2023-03-07 08-12-58.png' alt='qr'/>

        <button onClick={twilio} className={style.submit}>submit</button></div>
    </div>
  )
}
