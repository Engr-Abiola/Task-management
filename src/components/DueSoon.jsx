
import PropTypes from 'prop-types';

const DueSoon = ({user}) => {
    console.log( 'user prop in DueSoon:', user );
  return (
    <div>
        <h2>My task component .</h2>
    </div>
  )
}

DueSoon.propTypes ={
     user : PropTypes.shape( {
        role: PropTypes.string.isRequired,
        fullname: PropTypes.string,
        email : PropTypes.string,
        password : PropTypes.string
      }) 
}
export default DueSoon;
