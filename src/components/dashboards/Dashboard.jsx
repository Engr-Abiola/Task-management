
import './dashboard.css';
import PropTypes from 'prop-types';
import {ClipboardList, Users, LayoutDashboard, Settings, TimerOff, Clock, PersonStanding, UserPlus, LogOut, HandHelping, HelpingHand} from 'lucide-react';
import {  useState } from 'react';
import Overview from '../Overview';
import MyTasks from '../MyTasks';
import AllUsers from '../AllUsers';
import DuedTask from '../DuedTask';
import DueSoon from '../DueSoon';
import Setting from '../Setting';
import Logout from '../Logout';
import MyTeam from '../MyTeam';
import Supervisor from '../Supervisor';
import Help from '../Help';

const Dashboard = ( {data} ) => {

  const [activeItem, setActiveItem] = useState('Overview');

  // fetch data from the database and distribute to respective component on the menu
  const getStoredData =JSON.parse( localStorage.getItem('tasks') );

//Icons, labels related to either users, admins, super admin
  const menuItems = [
    { label: "Overview", icon: <LayoutDashboard />, roles: ["user", "admin", "super"] },
    { label: "My Tasks", icon: <ClipboardList />, roles: ["user"] },
    { label: "All Users", icon: <Users />, roles: [ "super"] },
    { label: "My Team", icon: <UserPlus />, roles: ["admin"] },
    { label: "Dued Task", icon: <TimerOff />, roles: ["admin", "user"]},
    { label: "Due Soon", icon:<Clock />, roles: ["admin", "user"]},
    { label: "Supervisor", icon: <PersonStanding />, roles: ["user"] },
    { label: "Setting",  icon: <Settings />, roles: ["user", "admin", "super"] },
    { label: "Help", icon: <HandHelping />, roles: ["user", "admin", "super"] },
    { label: "Logout", icon: <LogOut />, roles: ["user", "admin", "super"] },
  ];
   
   // finds the corresponding menu for the login user(either user, admin, or super admin)
   const visibleItems = menuItems.filter( item => item.roles.includes(data?.role));

   const all_labels = visibleItems.map( item => item.label);

// stores each component with the label 
   const components = [
    {name : 'Overview', component: <Overview user={data} storedData={ getStoredData } /* stats={ { total: 42, inProgress: 10, completed: 25, pending: 7 } } recentTasks={[]} */ />},
    {name : 'MyTasks', component: <MyTasks user={data} storedData={ getStoredData }  />},
    {name : 'AllUsers', component:  <AllUsers user={data}  storedData={ getStoredData } />},
    {name : 'DuedTask', component: <DuedTask user={data} storedData={ getStoredData }  />},
    {name : 'DueSoon', component: <DueSoon user={data} storedData={ getStoredData }  />},
    {name : 'Setting', component: <Setting user={data} storedData={ getStoredData }  />},
    {name : 'Logout', component : <Logout user={data}  storedData={ getStoredData }  />},
    {name : 'MyTeam', component : <MyTeam user={data}  storedData={ getStoredData }  />},
    {name : 'Supervisor', component : <Supervisor user={data} storedData={ getStoredData }  />},
    {name : 'Help', component : <Help user={data} storedData={ getStoredData }  />}
   ];
   

  return (
    <div className='dashboard'>

         <header className='topbar'>
              <div className='avatar'>
                {/*   <img src={userRecord.profileImage} alt="Profile" className="avatar" /> */}
                <h2>Avatar here</h2>
              </div>
              <div className='profile'>
                <h2>profile right here</h2>
              </div>
         </header>

         <aside className='leftbar'>
             <h4 className='dashboard-title'>  {data?.role.toUpperCase()}&apos;s DASHBOARD </h4>

            {visibleItems.map((item) => (
               <div key={item.label}   className={`menu-item ${activeItem === item.label ? 'active' : ''}`} onClick={ () => setActiveItem(item.label)}>
                   <span className='icon'>{item.icon} </span> 
                    <span className='label'>{item.label} </span>
                </div>
            ))}
         </aside>

         <main className='content'>
              {
                 all_labels.includes(activeItem) && components.map( comp => (
                    comp.name === activeItem.replace(' ', '') ?
                     <div key={comp.name}>{comp.component}
                     </div>
                       : null
                 ) )  
              }   
         </main>

    </div>
  )
}
/* stats={ { total: 42, inProgress: 10, completed: 25, pending: 7 } } */

Dashboard.propTypes = {
    data : PropTypes.shape( {
    role: PropTypes.string.isRequired,
    fullname: PropTypes.string,
    email : PropTypes.string,
    password : PropTypes.string
  } )
  /*  storageKeys : PropTypes.array.isRequired,
   userRecord: PropTypes.shape( {
    role: PropTypes.string.isRequired,
    fullname: PropTypes.string,
    profileImage: PropTypes.string,
  } ).isRequired, */
};



export default Dashboard;
