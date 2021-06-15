import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import './App.css';

function App() {//parent component
  var [value,setValue]=useState("");
  var [array,setArray]=useState([]);
  //since this component has two states both of them needs to be updates to re-render this component
  function addTodo(event)//adds a to-do to the list
  {
    event.preventDefault();
    if(value!=="")
    {
      const list=array;
      const inputObject={
        title: value,
        completed: false
      }
      list.push(inputObject)
      setArray(list);
      setValue("");
      //both the states are updated for re-render
    }
  }
  function deleteTodo(index)//removes a to-do from the list
  {
    const list =array;
    const result=list.filter((value,i) => i!==index )
    setArray(result);
  }
  

  function Todo({todo,completed,index})//child component
  {
    
    var [status,setStatus]=useState(completed)//this state is responsible for re-render of the to-do card
    function toggleStatus(index)//updates the status of the to-do
    {
      const list=array;
      list[index].completed=!list[index].completed;
      setStatus(list[index].completed)   
      setArray(list);
    }   
    var cardColor=status ? "#607D3B":"#E2252B"
    return(
      <Card >
          <Card.Body style={{backgroundColor: cardColor,}}>
              <div className="text-content" style={{backgroundColor: cardColor }} >
                  <Card.Title as="h5">{todo}</Card.Title>
                  <Card.Text>Status : {status ? "Completed":"In Progress"}</Card.Text>
              </div>
              <div className="button-content" style={{backgroundColor: cardColor,}}>
                  <Button  varient="light"
                    onClick={(e)=>{
                      e.preventDefault()
                      toggleStatus(index)}}>
                        {status ? "Not Done":"Done"}
                  </Button>{' '}
                  <Button varient="light"
                    onClick={(e)=>{
                      e.preventDefault();
                      deleteTodo(index);}}>
                        X
                  </Button>{' '}
              </div>
          </Card.Body>
      </Card>
    )
  }

  
  return (
    <div className="App">
      <div className="App-container">
          <h1>TO-DO-LIST</h1>
          <form >
              <input onChange={(e)=>{setValue(e.target.value);}} placeholder={"Write To-Do..."} ></input>
              <Button type="submit" variant="light" onClick={addTodo} >Add</Button>{' '}
          </form>
          <ol>
              {array.map((name,index)=>(//for each element of this array use this component
              <ul key={index}>
                <Todo
                  todo={name.title}
                  completed={name.completed}
                  index={index}></Todo>
              </ul>
              ))}
          </ol>
      </div>
    </div>
  );
}

export default App;
