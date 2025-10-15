
import PropTypes from 'prop-types';

const MyTeam = ({user}) => {
    console.log( 'user prop in MyTeam:', user );
  return (
    <div>
        <h2>My team component .</h2>
    </div>
  )
}

MyTeam.propTypes ={
     user : PropTypes.shape( {
        role: PropTypes.string.isRequired,
        fullname: PropTypes.string,
        email : PropTypes.string,
        password : PropTypes.string
      }) 
}
export default MyTeam;
