import React, { useEffect, useState } from 'react'
import style from './Sidebar.module.css'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useParams } from 'react-router-dom'
export default function Sidebar(props) {
    const id=useParams();
    const [flag,setflag]=useState(false);
    const [username,setusername]=useState('')
    const fetchData=async()=>{
      const result =await fetch(`http://localhost:5998/user/${id.id}`)
      const jsonresult=await result.json();
      setusername(jsonresult[0].Username);
    }
    useEffect(()=>{
      fetchData();
    })
  return (
    <div className={style.Sidedivwholecontainer}>
        <img src='../assests/ab72ee53b7bab6addbeb5e3a882f0ab850ddd249e64ff7f8c3a35dcc1a6351c2_200.webp' alt='not found' className={style.img} onClick={()=>setflag(!flag)}/>
         <SlidingPane
        // closeIcon={<div className={style.header}>Go Back</div>}
        isOpen={flag}
        title="Go Back"
        from="left"
        width="390px"
        onRequestClose={() => setflag(false)}
      >
        <div className={style.absolute}>
          <div className={style.sidebartopdiv}>  
        <img src='../assests/istockphoto-1087531642-170667a-removebg-preview.png' alt='not found' className={style.img1}/> 
        <div>
        <p className={style.welcome}>Welcome {username}</p>
        <p>Today,{new Date().getDate()} {new Date().toLocaleString('default', { month: 'long' })}</p>
        </div>
        </div>
        <div>
          <h2 style={{marginLeft:'15px'}}>Tasks</h2>
          <div className={style.priortydiv}>
            {props.catValue.map(a=>{
             return <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="category" value={a}  onClick={(e)=>props.setsorttask(e.target.value)}  defaultChecked={props.sorttask===a}/>
              <div className={style.priortysmalldiv} >{a}</div></label>
            })}
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="category" value="null" onClick={(e)=>props.setsorttask(e.target.value)} defaultChecked={props.sorttask===null} /><div className={style.priortysmalldiv} >None</div></label>
            </div>
        </div>
        <div>
          <h2 style={{marginLeft:'15px'}}>Priorty</h2>
          <div className={style.priortydiv}>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="priorty" value="High" onClick={(e)=>props.setsortpriorty(e.target.value)} defaultChecked={props.sortpriorty==='High'}/>
            <div className={style.priortysmalldiv} >High</div></label>
            <label  className={style.radiolabel} ><input type={'radio'}  className={style.radiobtn} name="priorty" value="Medium" onClick={(e)=>props.setsortpriorty(e.target.value)} defaultChecked={props.sortpriorty==='Medium'} /><div className={style.priortysmalldiv} >Medium</div></label>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="priorty" value="Low" onClick={(e)=>props.setsortpriorty(e.target.value)} defaultChecked={props.sortpriorty==='Low'} /><div className={style.priortysmalldiv} >Low</div></label>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="priorty" value="null" onClick={(e)=>props.setsortpriorty(e.target.value)} defaultChecked={props.sortpriorty===null} /><div className={style.priortysmalldiv} >None</div></label>
            </div>
        </div>
        <div>
          <h2 style={{marginLeft:'15px'}}>Status</h2>
          <div className={style.priortydiv}>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="status" value="All"  onClick={(e)=>props.setsortstatus(e.target.value)} defaultChecked={props.sortstatus==='All'}/>
            <div className={style.priortysmalldiv} >All</div></label>
            <label  className={style.radiolabel} ><input type={'radio'}  className={style.radiobtn} name="status" value="Complete"   onClick={(e)=>props.setsortstatus(e.target.value)} defaultChecked={props.sortstatus==='Complete'}/><div className={style.priortysmalldiv} >Complete</div></label>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="status" value="Pending"   onClick={(e)=>props.setsortstatus(e.target.value)}  defaultChecked={props.sortstatus==='Pending'}/><div className={style.priortysmalldiv} >Pending</div></label>
            </div>
        </div>
         </div>
      </SlidingPane>
        {/* {(flag&&props.flag)?(<div className={style.absolute}>
          <div className={style.sidebartopdiv}>  
        <img src='../assests/istockphoto-1087531642-170667a-removebg-preview.png' alt='not found' className={style.img1}/> 
        <div>
        <p className={style.welcome}>Welcome {username}</p>
        <p>Today,{new Date().getDate()} {new Date().toLocaleString('default', { month: 'long' })}</p>
        </div>
        </div>
        <div>
          <h2>Tasks</h2>
          <div className={style.priortydiv}>
            {props.catValue.map(a=>{
             return <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="category" value={a}  onClick={(e)=>props.setsorttask(e.target.value)}  defaultChecked={props.sorttask===a}/>
              <div className={style.priortysmalldiv} >{a}</div></label>
            })}
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="category" value="null" onClick={(e)=>props.setsorttask(e.target.value)} defaultChecked={props.sorttask===null} /><div className={style.priortysmalldiv} >None</div></label>
            </div>
        </div>
        <div>
          <h2>Priorty</h2>
          <div className={style.priortydiv}>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="priorty" value="High" onClick={(e)=>props.setsortpriorty(e.target.value)} defaultChecked={props.sortpriorty==='High'}/>
            <div className={style.priortysmalldiv} >High</div></label>
            <label  className={style.radiolabel} ><input type={'radio'}  className={style.radiobtn} name="priorty" value="Medium" onClick={(e)=>props.setsortpriorty(e.target.value)} defaultChecked={props.sortpriorty==='Medium'} /><div className={style.priortysmalldiv} >Medium</div></label>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="priorty" value="Low" onClick={(e)=>props.setsortpriorty(e.target.value)} defaultChecked={props.sortpriorty==='Low'} /><div className={style.priortysmalldiv} >Low</div></label>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="priorty" value="null" onClick={(e)=>props.setsortpriorty(e.target.value)} defaultChecked={props.sortpriorty===null} /><div className={style.priortysmalldiv} >None</div></label>
            </div>
        </div>
        <div>
          <h2>Status</h2>
          <div className={style.priortydiv}>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="status" value="All"  onClick={(e)=>props.setsortstatus(e.target.value)} defaultChecked={props.sortstatus==='All'}/>
            <div className={style.priortysmalldiv} >All</div></label>
            <label  className={style.radiolabel} ><input type={'radio'}  className={style.radiobtn} name="status" value="Complete"   onClick={(e)=>props.setsortstatus(e.target.value)} defaultChecked={props.sortstatus==='Complete'}/><div className={style.priortysmalldiv} >Complete</div></label>
            <label  className={style.radiolabel}><input type={'radio'}  className={style.radiobtn} name="status" value="Pending"   onClick={(e)=>props.setsortstatus(e.target.value)}  defaultChecked={props.sortstatus==='Pending'}/><div className={style.priortysmalldiv} >Pending</div></label>
            </div>
        </div>
         </div>):null} */}
    </div>
  )
}