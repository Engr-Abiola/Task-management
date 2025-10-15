
import PropTypes from 'prop-types';

const MyTasks = ({user}) => {

    console.log( 'user prop in MyTasks:', user );

  return (
    <div>
        <h2>My task component .</h2>
    </div>
  )
}

MyTasks.propTypes ={
     user: PropTypes.object.isRequired,
}
export default MyTasks;
