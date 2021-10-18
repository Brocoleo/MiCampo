import React, { useState} from "react";
import User from "./screens/User";
import Login from "./screens/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
    <Switch>
    <div className="code">
      <Route path="/"><User toggle={toggle} isOpen={isOpen}/> </Route>  
      <Route path="/login"><Login  /></Route>

    </div>
    </Switch>
    </Router>
  );
}

export default App;
