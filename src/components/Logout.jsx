
import PropTypes from 'prop-types';

const Logout = ({user}) => {
    console.log( 'user prop in Logout:', user );
  return (
    <div>
        <h2>Logout component .</h2>
    </div>
  )
}

Logout.propTypes ={
     user : PropTypes.shape( {
        role: PropTypes.string.isRequired,
        fullname: PropTypes.string,
        email : PropTypes.string,
        password : PropTypes.string
      }) 
}
export default Logout;
