
import PropTypes from 'prop-types';

const DuedTask = ({user}) => {
    console.log( 'user prop in AllUsers:', user );
  return (
    <div>
        <h2>My task component .</h2>
    </div>
  )
}
DuedTask.propTypes ={
     user : PropTypes.shape( {
        role: PropTypes.string.isRequired,
        fullname: PropTypes.string,
        email : PropTypes.string,
        password : PropTypes.string
      }) 
}
export default DuedTask
