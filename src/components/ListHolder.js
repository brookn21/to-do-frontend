import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";



import "bootstrap/dist/css/bootstrap.min.css";

function ListHolder(props) {
  const { list, lists, setLists } = props;
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate();


  const taskUrl = "http://localhost:3000/activities/" + list?.id;


  function changeClick(){
    setClicked(!clicked)
    console.log(clicked)
  }

  function deleteTask() {
    fetch(taskUrl, {
      method: "DELETE",
    })
      // .then((r) => r.josn())
      .then((deletedTask) => {
        const found = lists?.findIndex(task => task.id === list?.id)
        let newArr = lists
        newArr.splice(found,1)
        // console.log(lists)
        console.log(newArr)
        setLists(newArr)
        navigate("/");
      });;
  }

  return (
    <div>
    <Card>
      <Card.Body>
        {
          clicked || list.complete
      ?
      <input type="checkbox" className="checkButton" onChange={changeClick} />
      :
      <input type="checkbox" className="checkButton" onChange={changeClick}  checked/>
        }
      <label for="scales" className={  clicked || list.complete  ? null :  'label' }>{list.name}
        {/* <button className="deleteButton">trash</button> */}
        <input type="button" value="Trash" className="deleteButton" onClick={deleteTask}/>
{/* <span id="boot-icon" class="bi bi-trash" style="font-size: 10rem; color: rgb(165, 42, 42);"></span> */}
      </label>
</Card.Body>
      </Card> 
    </div>
  );
}

export default ListHolder;
