
//import { useNavigate } from 'react-router-dom';
import './home.css';
import Login from './Login';
import Signup from './Signup';
import PropTypes from "prop-types"

import {useState } from 'react';


function Home( {setData} ) {
   const[isLogin, setIsLogin] = useState(true);
   const[storageKeys, setStorageKeys] = useState( ()=> JSON.parse(localStorage.getItem('storageKeys')) || [] );

// incase of hot reload
/*    useEffect(() => {
  localStorage.setItem("storageKeys", JSON.stringify(storageKeys));
}, [storageKeys]);   */
     
  return (
    <div className="main-con">
        <div  className="title">
             <h1>Smartly Manage Your Tasks !</h1> 
             <h5>Turn Chaos Into Clarity !</h5>
        </div>

        <div className="left-pane">
            <h2>“Organize tasks, boost productivity, and get things done effortlessly.”</h2>

            <p>Welcome to our Todo List application, your ultimate productivity companion! Whether you&apos;re a busy professional, a student juggling assignments, or someone
                 looking to streamline daily tasks, our app is designed to help you stay organized and focused. With an intuitive interface and powerful features, you can 
                 easily create, manage, and prioritize your tasks. Say goodbye to forgotten deadlines and hello to a more productive you. Start using our Todo List app today
                 and take control of your time.
            </p>

            <h3>Stay on top of your goals with a task manager built for simplicity and focus. From personal to team tasks, track, assign, and complete with ease.</h3>
        </div>

        <div className="right-pane">
           
           <Login isLogin={isLogin} setIsLogin={setIsLogin}  storageKeys={storageKeys} setData={setData}/>

           <Signup isLogin={isLogin} setIsLogin={setIsLogin} setStorageKeys={setStorageKeys} storageKeys={storageKeys}  />
                
        </div>
    </div>
  )
}

Home.propTypes = {
  setData : PropTypes.func.isRequired
}

export default Home;
