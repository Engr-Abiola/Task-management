import PropTypes from "prop-types";
import './confirm-delete.css';
import DeclineDelete from "./DeclineDelete";

const ConfirmDelete = ( {handleConfirmDelete} ) => {
  return (
    <div id='confirm-delete'>
        <div id="warning">
              <h2>Warning!</h2>
              <span>Do you really want to delete ?</span>
        </div>
      <div id="buttons">
            <button onClick={()=> handleConfirmDelete()}>
                delete
            </button>
           <DeclineDelete />
      </div>
      
    </div>
  )
}

ConfirmDelete.propTypes = {
    handleConfirmDelete :PropTypes.func.isRequired
}

export default ConfirmDelete
