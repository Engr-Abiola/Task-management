
import './App.css';
//import Todo from './components/Todo';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './components/Todo';
import Dashboard from './components/dashboards/Dashboard';
import { useState } from 'react';

function App() {
 
 const[data, setData ] = useState(null);

   const getUserRecords = ( userRecord )=>{
          setData(userRecord);
   } 

  return (
    <div id='app-con'>
      <Router>
        <Routes>
           <Route path="/" element={<Home setData={getUserRecords}/>} />
           <Route path="/todo" element={<Todo />} />
           <Route path="/dashboard" element={< Dashboard data={data} />} />
       </Routes>
    </Router>
   </div>
  )
}
export default App;
