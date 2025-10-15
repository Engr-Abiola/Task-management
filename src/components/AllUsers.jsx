
import PropTypes from 'prop-types';

const AllUsers = ({user}) => {
    console.log( 'user prop in AllUsers:', user );
  return (
    <div>
        <h2>My task component .</h2>
    </div>
  )
}

AllUsers.propTypes ={
     user : PropTypes.shape( {
        role: PropTypes.string.isRequired,
        fullname: PropTypes.string,
        email : PropTypes.string,
        password : PropTypes.string
      }) 
}
export default AllUsers
