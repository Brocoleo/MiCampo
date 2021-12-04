import React, { useState} from "react";
import Footer from './Footer'
import User from "./screens/User/User";
import Login from "./screens/Login";
import Admin from './screens/Admin/Admin'
import Register from './screens/Register'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";



function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>

    <Router>
    <Switch>
    <div className="code">
      <Route  path="/user"><User toggle={toggle} isOpen={isOpen}/> </Route> 
      <Route  path="/admin"><Admin toggle={toggle} isOpen={isOpen}/> </Route>  
      <Route exact path="/"><Login  /></Route>
      <Route exact path="/register"><Register  /></Route>
      
    </div>
    </Switch>
    </Router>
  

      <Footer/>
      </>
    
    
  );
}

export default App;
