import React, { useState, useEffect } from "react";
import ListHolder from "./ListHolder";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Date from './Date'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"


function Homepage(props) {
  const { setLists, lists, user} = props
  const [ name, setName ] = useState("")
  // const [lists, setLists] = useState(user?.activities)


  useEffect(()=>{
 setLists(user?.activities)
}, []
)

const newTask = {
  name,
  complete: false,
  user_id: user?.id,
};

function createActivity(e) {
e.preventDefault();
fetch("http://localhost:3000/activities", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newTask),
})
  .then((r) => r.json())
  .then((addedTask) => setLists([...lists, addedTask]))
  setName("")
}

  const renderList = lists?.map((list) => <ListHolder list={list} setLists={setLists} lists = {lists}/>);



  return (
    <div className="list">
      <h1 className="date">{ user ? `Welcome, ${user?.username}` : "Welcome!"}</h1> 
      {/* <h2 className="date">{new Date().toLocaleString() + ''}</h2> */}
      <br/>
      <br/>
      <h3 className="date">Add to your to do list!</h3>
      <form onSubmit={createActivity}>
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Add to your List!"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <button type="button" class="btn btn-success">
          Enter
        </button>
      </InputGroup>
      </form>

     {renderList}
     {/* <li ><Link to="/login" class="navLink">login</Link></li> */}

    </div>
  );
}

export default Homepage;
