
import PropTypes from 'prop-types';

const Help = ({user}) => {
   
  return (
    <div>
        <h2>Help component </h2>
    </div>
  )

}

Help.propTypes ={
     user : PropTypes.shape( {
        role: PropTypes.string.isRequired,
        fullname: PropTypes.string,
        email : PropTypes.string,
        password : PropTypes.string
      }) 
}
export default Help;
