import React, { useEffect, useState } from 'react'
import style from './Attachmentpopup.module.css'
// import axios from "axios";
// import axios from 'axios';
export default function Attachmentpopup(props) {
    const [file,setfile]=useState('')
    const uploadfile=async(e)=>{
        
    //     e.preventDefault();
    //     let formData=new FormData();
    //     formData.append('file',file);
    //     formData.append('file',file.name);
    //     // axios.post("http://localhost:5998/upload", formData);
    //     let resultJson
    // await fetch (`http://localhost:5998/upload`,{
    //     method:'POST',
    //     headers:{'Content-Type': 'multipart/form-data;boundary=--------------------974767299852498929531610575'},
    //     body:formData
    //   })
    //     .then((response) => {return response.json()})
    //     .then((data) => { resultJson=data});
    }
    useEffect(()=>{
    },[file])
  return (
    <div className={style.whole}>
        <img src='../assests/customer-support-flat-illustration_23-2148892786_1_-removebg-preview.png' alt='f' className={style.img}/>
        <div className={style.container}>
      <div className={style.button_wrap}>
        <form onSubmit={uploadfile}>
        <label className={style.button} for="upload">Upload File</label>
        <input id="upload" type="file" onChange={(e)=>setfile(e.target.files[0])} accept="image/*" multiple={false}/><br></br>
        <button type='submit'>submit</button>
        </form>
      </div>
    </div>
    </div>
  )
}
