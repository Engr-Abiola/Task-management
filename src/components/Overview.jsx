
import PropTypes from 'prop-types';
import './overview.css';

const Overview = ({ user, storedData }) => {
  console.log(storedData)
  return (
    <div className="overview">

      <header className="overview-header">
          <h2>Welcome back, {user?.fullname.toUpperCase() || 'User'} </h2>
          <p> Here’s an overview of your current activities. </p>
      </header>
   
      <section className="overview-main">
        {    
         user.role === 'user'  &&
        <div className='user-overview'>
           <div className='mytask'>
                <h2> My task</h2>
           </div>

          <div className='dued-task'>
              <h2>Dued task</h2>
          </div>

          <div className='due-soon'>
               <h2>Due soon</h2>
          </div> 
       </div>
      }
      
      { user.role === 'admin' &&
           <div className='admin-overview'>
            <div>
              <h2>My team</h2>
            </div>
            <div>
               <h2>Due task</h2>
            </div>
            <div>
                <h2>Due soon</h2>
            </div>
      </div>
      }
      
      { user.role === 'super' &&
        <div className='super'>
            <div>
              <h2>Team 1</h2>
            </div>
            <div>
              <h2>Team 2</h2>
            </div>
      </div>
    }
  </section>
 </div>
  );
};

Overview.propTypes = {
  user: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  recentTasks: PropTypes.array.isRequired,
  storedData: PropTypes.object.isRequired,
};

export default Overview;

