
import {useState, useReducer} from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

const Login = ( {isLogin, setIsLogin, storageKeys, setData} ) => {
  
   // const[isLogin, setIsLogin] = useState(true);
    const[isLoginBtnClick, setIsLoginBtnClick] = useState(false);
     
   const navigate = useNavigate();
       //login details
    const [loginDetail, setLoginDetail] = useState( {email : "", password : ""} );

    // define the initial state for login errors
    const initialLoginErrors = {
    email: false,
    password: false,
   };

    //  Reducer for login errors
const loginReducer = (state, action) => {
  switch (action.type) {
    case 'invalidEmail':
      return { ...state, email: true };
    case 'invalidPassword':
      return { ...state, password: true };
    case 'reset':
      return { email: false, password: false };
    default:
      return state;
  }
};
    // useReducer hook for managing login errors
    const [loginErrors, loginDispatch] = useReducer( loginReducer, initialLoginErrors );


    // Validation function for login form data
const validateLoginFormData = (email, password) => {
  let isValid = true; // tracks error in validation

  // reset errors before validating
  loginDispatch({ type: 'reset' });

  if (!email || !email.includes('@')) {
      loginDispatch({ type: 'invalidEmail' });
      isValid = false;
  }

  if (!password || password.length < 6) {
      loginDispatch({ type: 'invalidPassword' });
      isValid = false;
  }

  return isValid;
};

// get data by role 
// login the user base on the role filtered 
function verifyUser(userEmail, userPassword)
{
    if(storageKeys.length > 0 ){
    
        for(let i=0; i < storageKeys.length; i++){
            const signupRecord = JSON.parse( localStorage.getItem( storageKeys[i] ) );
             signupRecord.map(element=>{
              if( (element.email === userEmail) && (element.password === userPassword) ){
                     console.log('found!');
                     setData(element);
                     navigate('/dashboard');  
                
                     console.log(element)
              
                     return ;
              }
            });
        }
   
    }
    else{
      console.log(`storageKey is not > 0:  ${storageKeys.length}`)
    }
  
} 

// Submit login data, validate each field for the required data
const submitLoginData = (e) => {
  e.preventDefault();
  setIsLoginBtnClick(true);
  loginDispatch({ type: 'reset' }); // reset errors on each submit

// trim whitespace from email and password
  const trimmedEmail = loginDetail.email.trim();
  const trimmedPassword = loginDetail.password.trim();

  const isValid = validateLoginFormData(trimmedEmail, trimmedPassword); // invoke validateLoginFormData function 

  if (isValid) {
    //const storedUser = JSON.parse(localStorage.getItem('signupdata'));
        verifyUser(trimmedEmail, trimmedPassword);
     // checks if storedUser exist, then compare the user provided email & password with one from localStorage
   /*  if (  storedUser && storedUser.email === trimmedEmail && storedUser.password === trimmedPassword )
      {
         console.log(' Login successful!');
         isLoginValid(trimmedEmail, trimmedPassword)
       //  navigate('/todo')
      // redirect or set auth state here

     } else {
      console.log(`Hey,no registered user found with the provided ${trimmedEmail}`);
     } */
  }
  else{
    console.log('Please, provide right data')
  }
 };

  // get 
  function handleSingUp(e){
        e.preventDefault();
        setIsLogin(false);
    }

     // get login form data
     function getLoginFormData (e){
        e.preventDefault();
        const{name, value} = e.target;
        setLoginDetail({
            ...loginDetail, [name] : value
        });
    } 

  return (
    <div>
        <div className={`login-con ${ !isLogin ? 'hidLogin-con' : '' }`}>
                    <div className="email-con"> 
                        {loginErrors.email && isLoginBtnClick && <span>Invalid email address</span>}
                        <input type="text" className="email" placeholder='email address' name='email' value={loginDetail.email} onChange={getLoginFormData}/>
                    </div>

                    <div className="password-con"> 
                        {loginErrors.password && isLoginBtnClick && <span>Invalid password</span>}
                         <input type="text" className="password" placeholder='password' name='password' value={loginDetail.password} onChange={getLoginFormData} />
                    </div>

                    <div className="forgot-password">
                        <div>
                            <input type="checkbox" name="" id="" />
                            <span>Remember Me</span>
                       </div>

                       <div>
                          <button>Forgot Password?</button>
                        </div>
                   
                    </div>

                    <div className='login-btn'> <button type="button" onClick={submitLoginData}> Login </button> </div>

                    <div> 
                      <span>Don&apos;t have an account?</span> 
                       <button className='signup-btn' onClick={ handleSingUp }> Sign up </button> 
                    </div>
                </div>
    </div>
  )
}

// Prop validation down here
Login.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  setIsLogin: PropTypes.func.isRequired,
  storageKeys : PropTypes.array.isRequired,
  setData : PropTypes.func.isRequired
};

export default Login
