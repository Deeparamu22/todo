import React,{useState,useEffect, useRef} from 'react'
import style from './Login.module.css'
import Buttons from '../Buttons/Buttons'
import { Link, useNavigate } from 'react-router-dom';
export default function Login(props) {
  const [signup, setsignup] = useState(false);
  const [Class,setClass]=useState({username:"",password:"",confirmpassword:""})
  const [signupInput,setsignupInput]=useState({username:"",password:"",confirmpassword:""});
  const [values,setvalues]=useState({id:"",username:"",password:""});
  const [login,setlogin]=useState({username:"",password:""});
  const [loginflag,setloginflag]=useState(false);
  const [loginbuttonclass,setloginbuttonclass]=useState("");
  const [flag,setflag]=useState(false);
  const username=useRef();
  const password=useRef();
  const navigate=useNavigate()
  useEffect(() => {
  if(values.id!==''){
    props.setid(values.id)
  }
  }, [login,props,values])  
  const handleClick=async ()=>{
    if(!(/^[A-z][A-z0-9]{7,14}$/.test(signupInput.username))){
      setClass({...Class,username:"invalid"})
    }
    else{
      setClass({...Class,username:""})
    }
    if(!(/^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/.test(signupInput.password)))
    {
      setClass({...Class,password:"invalid"})
    }
    else{
      setClass({...Class,password:""})
    }
    if(signupInput.confirmpassword!==signupInput.password)
    {
      setClass({...Class,confirmpassword:"invalid"});
    }
    else{
      setClass({...Class,confirmpassword:""})
    }
    if((/^[A-z][A-z0-9]{7,14}$/.test(signupInput.username))&&(/^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/.test(signupInput.password))&&(signupInput.confirmpassword===signupInput.password))
    {
      setflag(true);
      let alpha=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
      let id2="xxxx"
      id2=id2.split("").map(a=>a.replace("x",alpha[Math.floor(Math.random()*alpha.length)]));
      let id1="xx"
      id1=id1.split("").map(a=>a.replace("x",Math.floor(Math.random()*9)))
      setvalues({...values,id:id2.join("")+id1.join(""),username:signupInput.username,password:signupInput.password})
      props.setid(values.id);
        const result =await fetch ("http://localhost:5998/login",{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({id:id2.join("")+id1.join(""),username:signupInput.username,password:signupInput.password})
        })
        const resultJson1=await result.json();
        if(resultJson1==='success'){
        await fetch ("http://localhost:5998/create",{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({id:id2.join("")+id1.join(""),username:signupInput.username,password:signupInput.password})
        })
        .then((response) => {return response.json()})
        .then((data) => {console.log(data)
          navigate(`/main/${id2.join("")+id1.join("")}`);
        });
      }
    }
  }
  const handlelogin=async ()=>{
    let login={username:username.current.value,password:password.current.value}
    const result1 =await fetch ("http://localhost:5998/signin",{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(login)
        })
        const resultJson1=await result1.json();
        if(resultJson1!=null){
          setloginflag(true);
          setloginbuttonclass("");
          props.setid(resultJson1.id);
        }
        else{
          setloginflag(false);
          setloginbuttonclass("invalid");
        }    
  }
  return (
    <div className={style.wholecontainer1}>
      <div>
        <div className={style.styleCircle3}></div>
      <div className={style.styleCircle1}></div>
      <div className={style.styleCircle2}></div>
      <div className={style.styleCircle4}></div>
      <div className={style.styleCircle5}></div>
      <div className={style.styleCircle6}></div>
      </div>
      <div className={style.innerBox}>
        <div className={style.background}></div>
        <div className={style.Login}>
        {(signup)?<div className={style.Login1}>
          <div><p className={style.headText}>Hello,</p>
          <p className={style.headText}>Welcome Back</p>
          </div>
          <input type={'text'} className={style.inputDiv} placeholder={"User Name"} onChange={(e)=>setlogin({...login,username:e.target.value})} ref={username}/>
          <input type={'password'} className={style.inputDiv} placeholder={"Password"} onChange={(e)=>setlogin({...login,password:e.target.value})} ref={password}/>
          {(loginflag)?<Link to={`/main/${props.id}` }><Buttons name="LOGIN" color="blueviolet" handleClick={handlelogin}/></Link>:<Buttons name="LOGIN" color="blueviolet" handleClick={handlelogin}  loginbuttonclass={loginbuttonclass}/>}
          <p onClick={()=>setsignup(!signup)} className={style.create}>Create Account</p>
          </div>
          : <div className={style.wholecontainer2}>
          <div>
            <p className={style.headText}>Hii! Welcome to </p>
            <p className={style.headText}>TodoDaily</p>
            </div>
            <input type={'text'} className={style.inputDiv+" "+style[Class.username]} placeholder={"Username"} onChange={(e)=>setsignupInput({...signupInput,username:e.target.value})} pattern="^[A-z][A-z0-9]{7,14}$" />
            <input type={'password'} className={style.inputDiv+" "+style[Class.password]} placeholder={"Password"} onChange={(e)=>setsignupInput({...signupInput,password:e.target.value})}  pattern="^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$" />
            <input type={'password'} className={style.inputDiv+" "+style[Class.confirmpassword]} placeholder="Confirm Password" onChange={(e)=>setsignupInput({...signupInput,confirmpassword:e.target.value})}/>
            <Buttons name="GET STARTED" color="blueviolet" handleClick={handleClick}/>
            <p>Already have an account? <span onClick={()=>setsignup(!signup)}>Login</span></p>
        </div>}
        </div>
        </div>
    </div>
  )
}
