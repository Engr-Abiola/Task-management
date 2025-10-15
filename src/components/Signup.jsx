
import {useState, useReducer} from 'react';
import PropTypes  from 'prop-types';


const Signup = ( {isLogin, setIsLogin, setStorageKeys, storageKeys} ) => {

 const[isSubmitBtnClick, setIsSubmitBtnClick] = useState(false);
 //const[ismaximumAdmin, setIsMaximumAdmin] = useState(false);

 const [role, setRole] = useState( 'role' );

 //get the selected role
 function getRole (e){
    const selectedRole = e.target.value;
    setRole( selectedRole );
 }

    //signup data
    const [ signupDetail, setSignupDetail ] = useState( {
        fullname    : "",
        email         : "",
        password   : "",
        confirmPassword : "" ,
        passwordNotMatch : ''
    } );

    const reducerFn = (state, action)=>{
    switch (action.type) {
        case 'emptyName' : 
           return { ...state,username:true}
         case 'emptyEmail' :
           return {...state, email:true }
        case 'emptyPassword' :
           return { ...state, password:true }
        case 'confirmPassword' :
           return { ...state, confirmPassword:true }
        case 'password_does_not_match' :
           return { ...state, passwordNotMatch:true }
        case 'lessChar' : 
             return {...state, notLessthan: true }
        case 'notIncludesAtSymbol' :
           return { ...state, emailIncludesAtSymbol:true }
        case 'invalidEmail' :
            return { ...state, validEmail:true }
        case 'invalidRole' : 
            return {...state, role:true}
        case 'maxSuperAdmin' :
            return {...state, maxSuperAdmin:true}
        case 'reset' :
           return { username:false, email:false, password:false, confirmPassword:false, passwordNotMatch:false, notLessthan:false, emailIncludesAtSymbol:false, validEmail:false, role :false, maxSuperAdmin : false }
        default: return state;
    }
}

const [state, dispatch] = useReducer(reducerFn, {
    username:false, 
    email:false,
    password:false,
    confirmPassword:false, 
    passwordNotMatch:false, 
    notLessthan:false,
    emailIncludesAtSymbol:false,
    validEmail:false,
    role : false,
    maxSuperAdmin : false
    } );

    //Error state for max admins and super admin
    const maxAdmin = (state, action)=>{
       switch(action.type){
        case 'maxAdmin' : return { ...state, maxAdminReached : true }
        case 'maxSuperAdmin' : return { ...state, maxSuperReached : true }
        case 'reset' : return { maxAdminReached : false, maxSuperReached : false } 
        default : return state;
       }
    }
    const [maxState, dispatchMax] = useReducer(maxAdmin, {maxAdminReached : false, maxSuperReached : false} )

     // signup form validation
    function validateFormFields(){
         let validateError = false;
         
         //remove all spaces at the beginning and end of the user's input
         const trimmedName = signupDetail.fullname.trim();
         const trimmedEmail = signupDetail.email.trim();
         const trimmedPassword = signupDetail.password.trim();
         const trimmedConfirmPassword = signupDetail.confirmPassword.trim();

        if( ( trimmedName.length === 0 /* && !trimmedName.length > 0 */)  ){
            dispatch( { type : 'emptyName' } );
            validateError = true;
        }
        if(trimmedName.length === 1 ){
           dispatch( { type : 'lessChar' } );
           validateError = true;
        }
         if(trimmedEmail.length === 0){
            dispatch( { type : 'emptyEmail' } );
              validateError = true;
        }  
        if(  !trimmedEmail.includes('@') ){
            dispatch( { type : 'notIncludesAtSymbol' } );
              validateError = true;
        }
     if (
  trimmedEmail.length > 0 &&
  trimmedEmail.includes('@') && // only check if "@" is present
  !(
    trimmedEmail.includes('gmail') ||
    trimmedEmail.includes('yahoo') ||
    trimmedEmail.includes('outlook') ||
    trimmedEmail.includes('icloud') ||
    trimmedEmail.includes('mail') // optional extra
  )
) {
  dispatch({ type: 'invalidEmail' });
  validateError = true;
}
         if(  trimmedPassword.length === 0 || trimmedPassword.length < 6 ){  
            dispatch( { type : 'emptyPassword' } );
            validateError = true;
        }
         if( trimmedConfirmPassword .length === 0 )
          {
            dispatch( { type : 'confirmPassword' } );
              validateError = true;
         }         
        if( trimmedPassword  !== trimmedConfirmPassword && trimmedPassword.length > 0 && trimmedConfirmPassword.length > 0 ){ 
           // added condition to avoid showing this error when both password fields are empty  
                dispatch( { type : 'password_does_not_match' } );
             /*    setIsSignupFieldValidated(true); */
                 validateError = true;
            }  
        if(role === 'role'){
          dispatch( {type : 'invalidRole'} );
          validateError = true;
        }
      
            return !validateError;
    }
          //validateError = true;}

    // get sign-up datas
    const handleSignupData  = (e)=>{
        e.preventDefault();
        const {name, value} = e.target;

        setSignupDetail( {
           ...signupDetail, [name] : value
        } );
    } ;

    //save the keys without duplicate
    function saveKeys(key){
     if( !storageKeys.includes(key) ){
        setStorageKeys( [...storageKeys, key] );
         localStorage.setItem('storageKeys', JSON.stringify( [...storageKeys, key] ) ); // persisting  the keys
         console.log(key);
     }
    }

    // Assign a random admin level supervisor to a new user
    function assignUserToAdmin(storageKey){
        const adminLevels = ['level1', 'level2'];
        // only assign a supervisor if the new user is being stored in 'users' key
        if(storageKey === 'users'){
            const randomSelect = Math.floor( Math.random() * adminLevels.length );
            return adminLevels[randomSelect];
        }
        return null;
    }

    // check the selected role by the user and store the data in the localStorage based on the role
     function storeDataBasedOnRole(role, datas){
        const {fullname, email, password} = datas;

        switch(role){
          case  'user' :
          case  'admin' : 
          case  'super' : {
            let key = role === 'user' ? 'users' : role === 'admin' ? 'admins' : role==='super' ? 'superadmin' : '';
            
             let data = JSON.parse( localStorage.getItem( key) ) || [];

             if(key === 'admins' && data.length === 2){
                 dispatchMax( {type : 'maxAdmin'} );
                   saveKeys(key);
              //  validateError = true;
               return  true;
             }

            if(key === 'superadmin' && data.length === 1){
               dispatchMax( {type : 'maxSuperAdmin'} );
                 saveKeys(key);
               return false
             }

             if(key === 'users' ){
                 data.push( { fullname : fullname, email : email, password : password, role : role, supervisor : assignUserToAdmin(key) } );
                   localStorage.setItem(key, JSON.stringify(data));
                   saveKeys(key);
                   return;
             }
             
             data.push( { fullname : fullname, email : email, password : password, role : role } );
             localStorage.setItem(key, JSON.stringify(data));
             saveKeys(key);
            break;
          }
          default : break;
         }
    } 

    // stores signup form data in the localStorage if validated
     const submitFormData = (e)=>{
        e.preventDefault();
        dispatch( { type : 'reset' } );
        setIsSubmitBtnClick(true);
        const is_it_valid =  validateFormFields();

       // checks if atleast one form field fails validation
       if(is_it_valid) {
        // store the user data in the localStorage
         storeDataBasedOnRole(role, signupDetail);
       //  const{fullname, email, password} = signupDetail;
         
        
         // localStorage.setItem('signupdata', JSON.stringify(userData) );
          dispatch( { type : 'reset' } );

           setSignupDetail({   
             fullname    : "",
             email         : "",
             password   : "",
             confirmPassword : ""  
        });

       setRole('Role');
       setIsLogin(true);
        // setIsSubmitBtnClick(false);
       
      }
  
  } 


  return (
    <div>
      <div className={`signup-con ${isLogin ? '' : 'show'} `}>
                    <h2>Sign-up Form</h2>
                    <h3>All fields marked <span> * </span>  are compulsory</h3>

                <form action="" onSubmit={submitFormData}> 
                    <div className='role' >
                        { (isSubmitBtnClick && state.role) && <span>Role must be selected</span>}
                        { (isSubmitBtnClick &&  maxState.maxAdminReached)  && <span> maximum admins reached.</span> } 
                        { (isSubmitBtnClick && maxState.maxSuperReached)  && <span> Only one super admin is allowed </span> }
                         <select name="role"  value={role}  onChange={getRole}   >
                             <option value="role">Roles</option>
                             <option value="user">User</option>
                             <option value="admin">Admin </option>
                             <option value="super">Super admin</option>
                         </select>
                         <span>*</span>
                    </div>

                    <div className="user-name">
                        { ( isSubmitBtnClick    &&  state.username && !state.notLessthan  /*&&  !signupDetail.fullname */  ) && <span>Username can&apos;t be blank</span> }
                        { ( isSubmitBtnClick && state.notLessthan /*&&  !signupDetail.fullname */ ) && <span>Character can not be less than 2</span> }
                        <input type="text" placeholder="Full name" name='fullname' value={signupDetail.fullname} onChange={handleSignupData } />
                        <span>*</span>
                    </div>

                    <div className="email-con">
                        { ( isSubmitBtnClick && state.email/* && !signupDetail.email */) && <span>Email Address can&apos;t be blank</span> }
                        { ( isSubmitBtnClick && state.emailIncludesAtSymbol/* && !signupDetail.email */) && <span>Email address must contain the @ symbol</span> }
                        { ( isSubmitBtnClick && state.validEmail /* && !signupDetail.email */) && <span>Email address must be valid</span> }
                        <input type='email' placeholder="Email Address" name='email'  value={signupDetail.email} onChange={handleSignupData} />
                        <span>*</span>
                    </div>  
      
                    <div className="password-con">
                        { (isSubmitBtnClick && state.password && signupDetail.password.length === 0  && !signupDetail.password) && <span>Password can&apos;t be blank</span> }
                        { isSubmitBtnClick && state.password && signupDetail.password.length > 0 && signupDetail.password.length < 6 && <span>Password must be at least 6 characters</span> }
                        <input type='password' placeholder="Password" name='password' value={signupDetail.password} onChange={handleSignupData}  />
                        <span>*</span>
                    </div>  

                    <div className="confirmP-con">
                       { (isSubmitBtnClick && state.confirmPassword && !signupDetail.confirmPassword) && <span>Confirm Password can&apos;t be blank</span> }
                       { (isSubmitBtnClick && state.passwordNotMatch && !signupDetail.confirmPassword) && <span>Password does not match</span> }
                        <input type='password' placeholder="Confirm Your Password" name='confirmPassword' value={signupDetail.confirmPassword} onChange={handleSignupData}  />
                        <span>*</span>
                    </div> 
                               
                    <div className='submit-btn'> <input type="submit" value='Submit' className='submit' /> </div>
                    </form>
                </div>
    </div>
  )
}

// Prop validation down here
Signup.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  setIsLogin: PropTypes.func.isRequired,
  setStorageKeys:PropTypes.func.isRequired,
  storageKeys:PropTypes.array.isRequired
};

export default Signup;
