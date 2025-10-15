
import PropTypes from 'prop-types';

const Supervisor = ({user}) => {
    console.log( 'user prop in Supervisor:', user );
  return (
    <div>
        <h2>My task component .</h2>
    </div>
  )
}

Supervisor.propTypes ={
     user : PropTypes.shape( {
        role: PropTypes.string.isRequired,
        fullname: PropTypes.string,
        email : PropTypes.string,
        password : PropTypes.string
      }) 
}
export default Supervisor;
