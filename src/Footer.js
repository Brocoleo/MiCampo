import React from "react";
import Grid from '@mui/material/Grid';
import logo from './assets/utalca_gris.png';
import agronomia from './assets/agronomia.png';
import citra from './assets/citra_gris.png';


const Footer = () => (
  <div className="footer">
      <Grid   container direction="row" justifyContent="flex-end" alignItems="center">    
       <Grid item xs={6}>
        <p>2 NORTE 685 TALCA - CHILE | TELÉFONO (56-71) 200200</p>
        </Grid>
        <Grid item xs>
        <img src={logo} alt="citra"  height="60px" className="imagenFooter"/>
        </Grid>
        <Grid item xs>
        <img src={agronomia} alt="citra" height="60px" className="imagenFooter"/>
        </Grid>
        <Grid item xs>
        <img src={citra} alt="citra" height="60px" className="imagenFooter"/>
        </Grid>
      </Grid>

      
    

  </div>
);

export default Footer;