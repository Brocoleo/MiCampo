import React from 'react'
import  {  CenteredContent} from './styles'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import Water from "../components/Animations/Water";
import Sidebar from "../components/Sidebar/Sidebar";
import Go from "../components/Go/Go";

const Login = ({isOpen, toggle, updateCity, fetchWeather}) => {
    return (
        <Router>
        <Navbar />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <CenteredContent>
         <Water />  
         </CenteredContent>  
         <Go updateCity={updateCity} fetchWeather={fetchWeather} />
         </Router>
    )
}

export default Login
