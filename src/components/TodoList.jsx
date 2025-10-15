import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConfirmDelete from './ConfirmDelete';
import './todoList.css';
import React from 'react';
import { DeleteContext } from './DeleteContext';

const TodoList = ({todoList, setTodoList,  handleTodoListDeleted, getAllTasks}) => {

let [deleteTodo, setDeleteTodo] = useState();
let [confirmDelete, setConfirmDelete] = useState(false);
let [taskIdToBeDeleted, setTaskIdToBeDeleted] = useState();
const [tooltip, setTooltip]  = useState( ()=> Array(todoList.length).fill(false) ); 

/*  let [taskCompletedList, setTaskCompletedList] = useState(() => {
    return Array(todoList ?. length  || 0 ).fill(false);
});  */

// Initialize the state with either status property of todolist object stored in localstorage or
// create an array with the total length of todolist, fill each index with false
    let [taskCompletedList, setTaskCompletedList] = useState( ()=>{
        const fetchedFromLocalStorage = JSON.parse(localStorage.getItem('todoList'))
        return fetchedFromLocalStorage ? fetchedFromLocalStorage.map( el=> el.status) :
        Array(todoList.length).fill(false,0,todoList.length)
});   
 
const inputRefs = useRef([]);
  //generate refs dynamically 
     useEffect(() => {
    // Reset the array to the right size
    inputRefs.current = Array(todoList.length).fill().map( (_, index) => 
      inputRefs.current[index] || null // checks if input field contains undefined,empty string,null, if it does, set it to null
    );
  }, [todoList]);

   function delete_a_task(id){
      setConfirmDelete(true);
      setTaskIdToBeDeleted(id);
} 

function handleConfirmDelete(){
      setDeleteTodo(deleteTodo); 
      handleTodoListDeleted(taskIdToBeDeleted);
      setConfirmDelete(false);
}   

 function handleEdit_a_task (task_index){
     //Set focus on the input element at the specified task index
    if (inputRefs.current[task_index]) {
      inputRefs.current[task_index].focus();
      // Select all text in the input field
      inputRefs.current[task_index].select();
    }
} 

  function changeInputText(e, taskId) {
    const newValue = e.target.value;
    
    // Update the todoList with the new task value
    const updatedList = todoList.map(item => 
      item.taskId === taskId ? { ...item, task: newValue } : item
    );
    setTodoList(updatedList);
  }

    function handleSave(taskId) {
    // You can implement saving functionality here if needed
    console.log(`Saving task ${taskId}`);
    // If you need to trigger something on save, you can do it here
  }
  
  // handle checkboxes
  function taskCompleted(index){
     taskCompletedList[index] = !taskCompletedList[index]; // toggled the particular checkbox clicked,this changes that particular index in the array.
     setTaskCompletedList( [...taskCompletedList]); //updates the setTaskCompletedList with the array

    const updatedTodoObject = todoList[index]; // gets the particular object where the checkbox was ckicked and save it into updatedTodoObject
     updatedTodoObject.status = taskCompletedList[index];//
     todoList[index] = updatedTodoObject;
     setTodoList([...todoList]) ;
  } 

 //generate refs dynamically for all the red and green indicators
const divRefs = useRef([]);
     useEffect(() => {
        divRefs.current.map((_, index)=>divRefs.current[index])
  }, [tooltip]);

// MouseEnter on red indicator triggers tooltip(uncompleted task)
function handleMouseEnter (event, index ){
  // Get the computed style of the element
  const computedStyle = window.getComputedStyle(event.target);
  
  // Access the background-color property of the computedStyle
  const backgroundColor = computedStyle.backgroundColor;
  const rgbColor = 'rgb(255, 0, 0)';
    if(  backgroundColor === rgbColor ) {
        tooltip[index] = !tooltip[index] ; // toggled the element at the index position
        setTooltip([...tooltip]);
    }
}

function handleMouseLeave (e, index){
        // Get the computed style of the element
  const computedStyle = window.getComputedStyle(event.target);
  
  // Access the background-color property of the computedStyle
  const backgroundColor = computedStyle.backgroundColor;
  const rgbColor = 'rgb(255, 0, 0)';
    if(  backgroundColor === rgbColor ) {
        tooltip[index] = !tooltip[index] ; // toggled the element at the index position
        setTooltip([...tooltip]);
    }
    }

    // Invoke getAllTasks everytime taskCompletedList or getAllTasks changes
    useEffect(() => {
           getAllTasks([...taskCompletedList]); // anytime that useEffect take a function call, the function must be pass as a dependency 
     }, [taskCompletedList, getAllTasks]);


let td = todoList.map( (t,i)=>
  <React.Fragment key={i}>
   
     <li key={i}>
       {/* <div key={i} className={taskCompletedList[i] ? 'done' : 'undone'}></div> */}
       
        { tooltip[i]  &&
          <div className='tooltip'>
               <span>uncompleted task </span> 
          </div>
          
       } 
    
       <input type="text" name={i}  value={t.task} onChange={(e)=>changeInputText(e,t.taskId)} ref={el => inputRefs.current[i] = el}  />
   
        <button  onClick={() =>delete_a_task(t.taskId) } className='margin-right'  >Delete</button>
        <button  onClick={()=>handleEdit_a_task(t.taskId)} className='margin-right' name={i}>Edit</button>
        <button  onClick={()=>handleSave(t.taskId)}>Save</button>
    
         <input type="checkbox" name="" checked={taskCompletedList[i]} onChange={()=>taskCompleted(i)} />  
         
          <div key={i} 
            className={taskCompletedList[i] ? 'done' : 'undone'} 
            ref = {element => divRefs.current[i] = element }
            onMouseEnter = {(e)=>handleMouseEnter(e,i) }
            onMouseLeave = {(e)=>handleMouseLeave(e,i) } 
          >
          </div> 
           
     </li>

   
   </React.Fragment> 
   )

  return (
    
    <div >
       <ol>
          {td}
       </ol>
       <DeleteContext.Provider value={[setConfirmDelete, confirmDelete]} >
      { confirmDelete &&
          < ConfirmDelete handleConfirmDelete = {handleConfirmDelete} />
      }
       </DeleteContext.Provider>
     </div>
  )
  }

TodoList.propTypes = {
  todoList : PropTypes.array.isRequired,
  handleTodoListDeleted : PropTypes.func.isRequired,
  setTodoList : PropTypes.func.isRequired,
  getAllTasks : PropTypes.func.isRequired
};

export default TodoList

