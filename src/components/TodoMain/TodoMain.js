import React,{useEffect,useState} from 'react'
import Header from '../Header/Header'
import style from './TodoMain.module.css'
import {useParams} from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar'
import Todoform from '../Todoform/Todoform'
import TodoBoards from '../TodoBoards/TodoBoards'
import DeleteAlert from '../Deletealert/DeleteAlert'
import ReminderPopup from '../ReminderPopup/ReminderPopup'
import Viewtodo from '../Viewtodo/Viewtodo'
import Addcategory from '../Addcategory/Addcategory'
import Notes from '../Notes/Notes'
import Attachmentpopup from '../Attachmentpopup/Attachmentpopup';

export default function TodoMain(props) {
  const [show, setshow] = useState(false);
  const [showBoard,setshowBoard] = useState([]);
  const [deleteShow,setdeleteShow]=useState(false);
  const [deletevalue,setdeletevalue]=useState(null);
  const [value,setvalue]=useState([]);
  const [flag,setflag]=useState(true);
  const [addCat,setaddCat]=useState(false);
  const [currentvalue,setcurrentvalue]=useState(false);
  const [shownote,setshownote]=useState(false);
  const [catValue, setcatValue] = useState(["work","birthday","personal"]);
  const [formtodo,setformtodo]=useState([]);
  const [category,setcategory]=useState("No Category");
  const [showattachment,setshowattachment]=useState(false);
  const [reminderPop,setreminderPopup]=useState(false);
  const [priorty,setpriorty]=useState('');
  const [sortpriorty,setsortpriorty]=useState(null);
  const [sortstatus,setsortstatus]=useState('All');
  const [sorttask,setsorttask]=useState(null);
  const {id}=useParams();
  const fetchData=async()=>{
    const result =await fetch(`http://localhost:5998/home/${id}`)
    const jsonresult=await result.json();
    setshowBoard(jsonresult);
  
   if(catValue!==undefined){
    jsonresult.map(a=>{
     return ((!catValue.includes(a.Category))&&a.Category!=="No Category")? setcatValue([...catValue,a.Category]):null
    })
  }
  }
  const sortdata=async()=>{
    const result =await fetch(`http://localhost:5998/sort/${id}/${sortpriorty}/${sorttask}/${sortstatus}`)
    const jsonresult=await result.json();
    if(catValue!==undefined){
      console.log(jsonresult);
      setshowBoard(jsonresult);
      jsonresult.map(a=>{
       return ((!catValue.includes(a.Category))&&a.Category!=="No Category")? setcatValue([...catValue,a.Category]):null
      })
    }
  }
  
  useEffect(()=>{
      // fetchData();
        sortdata();
  },[props.id,show,deleteShow,shownote,flag,sortpriorty,sortstatus,sorttask,category,id])
  useEffect(() => {
    }, [props,formtodo,value,catValue,showBoard,sortdata]);
  function handledeletediv(e)
  {
    if(e.target.parentElement.id!==undefined)
    {
      setdeletevalue(e.target.parentElement.id);
    }
    setdeleteShow(!deleteShow);
  }
  const handleDelete=async (e) =>{ 
    let temp =deletevalue;
    setdeleteShow(!deleteShow);
    await fetch (`http://localhost:5998/delete/${id}/${temp}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
    })
    .then((response) => {return response.json()})
    .then((data) => {return (data)});
  }
    const handleflag=()=>{
      setflag(!flag);
    }
  const handletodoform=(e)=>{
    setshow(!show);
  }
  const handleedit=async(e)=>{
    setflag(!flag);
    let r
    if(e.target.id!=="")
    {
      r=showBoard.filter(a=>a.id===Number(e.target.id));
    }
    else{
      r=showBoard.filter(a=>a.id===Number(e.target.parentElement.id));
    }
    setvalue(r);
    setpriorty(r[0].priorty);
    setcategory(r[0].Category);
    if(!(catValue.includes(r[0].Category))&&(r[0].Category!=='No Category')) {
      setcatValue([...catValue,r[0].Category]);
    }
  }

  const handleinputvalue=async(e)=>{
    if((!(catValue.includes(e)))&&(e!=='No Category')&&(e!=='3')) {
      setcatValue([...catValue,e]);
    }
    setcategory(e);
    let temp=value[0].id;
    await fetch (`http://localhost:5998/setcategory/${id}/${temp}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({value:e})
    })
    .then((response) => {return response.json()})
    .then((data) => {return (data)});
  }

  const handlepriorty=async(e)=>{
    setpriorty(e);
    let temp=value[0].id;
    await fetch (`http://localhost:5998/setpriorty/${id}/${temp}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({priorty:e})
    })
    .then((response) => {return response.json()})
    .then((data) => { return (data)});
  }

  const savenotes=async (e)=>{
    let resultJson
    await fetch ("http://localhost:5998/notes",{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(e)
    })
      .then((response) => {return response.json()})
      .then((data) => { resultJson=data});
    let r=resultJson.filter(a=>a.id===value[0].id); 
    setvalue(r);
   
  }
  const savesubtodo=async (e,a)=>{
    let r={tablename:id,id:e,subtodo:JSON.stringify(a)}
    let resultJson
    await fetch ("http://localhost:5998/todo",{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(r),
    })
    .then((response) => {return response.json()})
    .then((data) => { resultJson=data});
    setvalue(resultJson);
  }
  return (
    <div className={style.whole}>
        <Sidebar catValue={catValue} setsortpriorty={setsortpriorty} setsortstatus={setsortstatus} sortstatus={sortstatus} sorttask={sorttask} setsorttask={setsorttask} sortpriorty={sortpriorty} flag={flag}/>
        {(show)?<Todoform handletodoform={handletodoform} showBoard={showBoard} id={id} setformtodo={setformtodo}/>:null}
        {(deleteShow)?<DeleteAlert handledeletediv={handledeletediv} showBoard={showBoard}  handleDelete={handleDelete}/>:null}
        {(reminderPop)?<ReminderPopup value={value} setreminderPopup={setreminderPopup}/>:null}
        {(showattachment)?<Attachmentpopup handledeletediv={handledeletediv} showBoard={showBoard}  handleDelete={handleDelete}/>:null}
        {(addCat)?<Addcategory setaddCat={setaddCat} addCat={addCat} handleinputvalue={handleinputvalue} currentvalue={currentvalue} setcurrentvalue={setcurrentvalue}/>:null}
       {(shownote)?<Notes shownote={shownote} setshownote={setshownote} id={props.id} value={value} savenotes={savenotes}/>:null}
        <div className={style.maindiv}>
        <Header/>
        <div>
          {(flag)?<TodoBoards setshowBoard={setshowBoard} showBoard={showBoard} handledeletediv={handledeletediv} handleDelete={handleDelete} handleedit={handleedit}/>:<Viewtodo  value={value} handleflag={handleflag} setaddCat={setaddCat} addCat={addCat} catValue={catValue} currentvalue={currentvalue} setcurrentvalue={setcurrentvalue}  shownote={shownote} setshownote={setshownote} category={category} flag={flag} savesubtodo={savesubtodo} setshowattachment={setshowattachment} showattachment={showattachment} handleinputvalue={handleinputvalue} handlepriorty={handlepriorty} priorty={priorty} reminderPop={reminderPop} setreminderPopup={setreminderPopup}/>}
          </div>
          {(flag)?<div className={style.lastdiv} onClick={()=>{setshow(!show)}}>
      <div className={style.styleCircle1}><p className={style.plus}>&#43;</p></div>
      </div>:null}
        </div>
        {(show||deleteShow||addCat||shownote||showattachment||reminderPop)?<div className={style.position}></div>:null}
    </div>
  )
}