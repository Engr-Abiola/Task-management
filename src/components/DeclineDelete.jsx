import { useContext } from "react";
import { DeleteContext } from "./DeleteContext";

const DeclineDelete = () => {
    const[ setConfirmDelete, confirmDelete] =  useContext(DeleteContext);
    
    const toggleConfirmDelete = ()=>{
        setConfirmDelete(!confirmDelete);
    }
 
  return (
    
       <div>
         
          <div id="decline">
                <button onClick={toggleConfirmDelete}>
                      decline
                  </button>
          </div>
        
      </div>
    
  )
}

export default DeclineDelete
