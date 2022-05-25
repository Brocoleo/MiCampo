import React, { useState}from 'react'
import User from "./screens/User/User";
import Login from "./screens/Login";
import Admin from './screens/Admin/Admin'
import Register from './screens/Register'
import DashAdmin from './screens/Admin/DashAdmin'
import PanelSectores from './screens/Admin/PanelSectores'
import PanelSensores from './screens/Admin/PanelSensores'
import Graficos from './screens/Admin/Graficos'
import GraficosUser from './screens/User/GraficosUser'
import PanelEstaciones from './screens/Admin/PanelEstaciones'
import PanelUsuarios from './screens/Admin/PanelUsuarios'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import DashUser from './screens/User/DashUser';
import Info from './screens/User/Info';




function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  console.disableYellowBox = true;
  return (

  
   <Router>
    
    <Routes>
      <Route  path="/user/*" element={<User toggle={toggle} isOpen={isOpen}/> }>
            <Route path="dash"  element={<DashUser />} />
            <Route  path="graficos"  element={<GraficosUser />}/>
            <Route path="informacion" element={<Info />}  />
      </Route>    
      <Route  path="/admin/*"  element={<Admin toggle={toggle} isOpen={isOpen}/>}>
            <Route  path="dash"   element={<DashAdmin />} />
            <Route  path="sectores"  element={<PanelSectores />} />
            <Route  path="usuarios"  element={<PanelUsuarios />} />
            <Route  path="sensores"   element={<PanelSensores />}/>
            <Route  path="graficos"  element={<Graficos />}/>
            <Route  path="estaciones"  element={<PanelEstaciones/>}/>
            <Route  path="configuracionadmin"  element={<h1>Configuraciones</h1>} />
      </Route>
      <Route  path="/"  element={<Login  />}/> 
      <Route  path="/register"  element={<Register  />}/> 
      
    </Routes>
    </Router>
  


      
    
    
  );
}

export default App;
