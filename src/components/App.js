import React, { useState, useEffect} from 'react'
import "../App.css"
import Homepage from './Homepage'
import LoginPage from './LoginPage'
import NavBar from './NavBar'
import { Routes, Route, BrowserRouter } from "react-router-dom"



function App() {

  const [ user, setUser ] = useState(null)
  const [lists, setLists] = useState([])

  useEffect(()=>{
    if (localStorage.uid)
      fetch("http://localhost:3000/profile",{
        method: 'POST',
        headers: { 
          'content-type': 'application/json',
          'Authenticate': localStorage.uid}
      })
      .then(r => r.json())
      .then( userInfo => setUser(userInfo))
    else
    console.log("No user found")
  }, [])


  return (
    <div>
      {user ? <NavBar setUser={setUser}/> : null }
      {/* <h1 className="date">{ user ? `Welcome, ${user?.username}` : "Welcome!"}</h1>  */}
      <br/>
      <h2 className="date">{new Date().toLocaleString() + ''}</h2>
      {/* { !user ? <LoginPage setUser={setUser}/> : <Homepage user={user}/>} */}
      {/* <Homepage/> */}
      <Routes>
                <Route path="/" element={ user ? <Homepage user= {user} lists={lists} setLists={setLists}/> : <LoginPage setUser={setUser}/> }/>
                {/* <Route path="/" element={<App/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
