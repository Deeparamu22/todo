import React,{useState} from 'react'
import style from './Todoform.module.css'

export default function Todoform(props) {
  const [todo,settodo] = useState({TaskName:"",Description:"",id:""})
  const handlechange=(e)=>{
    settodo({...todo,[e.target.name]:e.target.value,id:props.id});
  }
  
  const handleClick= async ()=>{
    if(todo.TaskName!==""&&todo.Description!==""){
    const result =await fetch ("http://localhost:5998/home/",{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(todo)
    })
    const resultJson=await result.json();
    props.setformtodo(resultJson);
    props.handletodoform();
  }
  }
  return (
    <div className={style.whole}>
      <div className={style.head}>
        <h1 className={style.addTask}>Add New Task</h1>
        <h6 onClick={()=>{props.handletodoform()}}>×</h6>
      </div>
      <p>Task Name</p>
      <input type={'text'} name="TaskName" className={style.taskname} onChange={handlechange}/>
      <p>Description</p>
      <textarea name="Description" rows={3} cols={2} onChange={handlechange} className={style.textarea}></textarea><br></br>
      <button onClick={handleClick} className={style.formsubmit}>Submit</button>
    </div>
  )
}