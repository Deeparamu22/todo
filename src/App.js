
import './App.css';
import Login from './components/Login/Login';
import TodoMain from './components/TodoMain/TodoMain';
import {  Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  const [id,setid]=useState(null);
  useEffect(() => {
  }, [id])  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login setid={setid} id={id}/>}>
          
        </Route>
        <Route path='/main/:id' element={<TodoMain />}>
        </Route>
       </Routes>
    </div>
  );
}
export default App;