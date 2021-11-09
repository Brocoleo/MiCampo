import React, { useState} from "react";
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
    <div  className="page-container">
    <Router>
    <Switch>
    <div className="code">
      <Route exact path="/"><User toggle={toggle} isOpen={isOpen}/> </Route>  
      <Route exact path="/admin"><Admin toggle={toggle} isOpen={isOpen}/> </Route>  
      <Route path="/login"><Login  /></Route>
      <Route path="/register"><Register  /></Route>
      
    </div>
    </Switch>
    </Router>
    </div>
    
  );
}

export default App;
