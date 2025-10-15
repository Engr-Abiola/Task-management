
import PropTypes from 'prop-types';

const Setting = ({user}) => {
    console.log( 'user prop in Setting:', user );
  return (
    <div>
        <h2>All setting activities.</h2>
    </div>
  )
}

Setting.propTypes ={
     user : PropTypes.shape( {
        role: PropTypes.string.isRequired,
        fullname: PropTypes.string,
        email : PropTypes.string,
        password : PropTypes.string
      }) 
}
export default Setting;
