import React, {useState} from 'react'
//import WeatherComponent from "../components/WheatherInfo/WeatherInfo";
//import Assistant from '../../components/User/Assistent/Assistent'
import LineChart from "../../components/User/LineChart/LineChart";
import WeatherStation from "../../components/User/WeatherStation/WeatherStation";
import Notifications from './Notifications'
import { IconContext } from "react-icons";
import BarChart from '../../components/User/BarChart/BarChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AiOutlineLineChart, AiOutlineBarChart} from "react-icons/ai";
import FadeIn from 'react-fade-in';
import { Grid, Row, Col } from 'react-flexbox-grid';
import  { MiniContainer, ChartContainer} from '../styles'
import { styled } from '@mui/material/styles';


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: '10px',
    boxShadow: '2px 2px #134E5E',
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:hover, &:focus': {
      background: '#134E5E',
    },
  },
}));

const DashUser = () => {  
  const [grafico, setGrafico] = useState('linea');

  const handleAlignment = (event, newAlignment) => {
    setGrafico(newAlignment);
  };

 

const temperaturaLine = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    datasets: [
      {
        label: 'temperatura de la estacion',
        data: [2, 14, 7, 15, 2, 6],
        fill: true,
        backgroundColor: 'rgba(255, 38, 38, 0.2)',
        borderColor: 'rgb(255, 38, 28)',
      },
    ],
  };
  const humedadLine = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    datasets: [
      {
        label: 'humedad de la estacion',
        data: [12, 19, 3, 5, 2, 3],
        fill: true,
        backgroundColor: 'rgba(20, 39, 155,0.2)',
        borderColor: 'rgb(20, 39, 155)',
      },
    ],
  };

  const TemperaturaBar = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    datasets: [
      {
        label: 'humedad de la estacion',
        data: [2, 14, 7, 15, 2, 6],
        fill: true,
        backgroundColor: 'rgba(255, 38, 38, 0.2)',
        borderColor: 'rgb(255, 38, 28)',
        borderWidth: 1,
      },
    ],
  };

  const humedadBar = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    datasets: [
      {
        label: 'humedad de la estacion',
        data: [12, 19, 3, 5, 2, 3],
        fill: true,
        backgroundColor: 'rgba(20, 39, 155,0.2)',
        borderColor: 'rgb(20, 39, 155)',
        borderWidth: 1,
      },
    ],
  };


 


    return (
      <Grid fluid>
        <Row around="xs"> 
       
         {/*<Grid item xs>
          <Container>
          <WeatherComponent />
          </Container>      
         </Grid> */}

    
          <Col xs >
          <FadeIn >
          <MiniContainer>
          <WeatherStation />
          <Notifications />
          </MiniContainer>  
          </FadeIn> 
          </Col>
     

        
          <Col xs >
       
          <FadeIn className='tipoGrafica'>
                    <StyledToggleButtonGroup  aria-label="tipo grafica" value={grafico} exclusive onChange={handleAlignment}  size="small"
 >
                      <ToggleButton value="barra" aria-label="left aligned" >
                      <IconContext.Provider value={{ color: "#fff", size: "2em" }}>
                        <AiOutlineBarChart />
                        </IconContext.Provider>
                      </ToggleButton>
                      <ToggleButton value="linea" aria-label="justified" >
                      <IconContext.Provider value={{ color: "#fff", size: "2em" }}>
                        <AiOutlineLineChart />
                        </IconContext.Provider>
                      </ToggleButton>
                    </StyledToggleButtonGroup>
                   </FadeIn> 

            {(() => {
                    switch (grafico) {
                      case 'linea':
                        return <> <FadeIn><ChartContainer><LineChart title='Humedad' data={humedadLine} icono={false}/>  
                            </ChartContainer><ChartContainer><LineChart title='Temperatura' data={temperaturaLine} icono={true}/> </ChartContainer > </FadeIn> </> 
                      case 'barra':
                        return <> <FadeIn><ChartContainer><BarChart title='Humedad' data={humedadBar} icono={false}/> 
                            </ChartContainer><ChartContainer><BarChart title='Temperatura' data={TemperaturaBar} icono={true}/> </ChartContainer ></FadeIn></>
                      default:
                        return <> <FadeIn><ChartContainer><LineChart title='Humedad' data={humedadLine} icono={false}/>  
                            </ChartContainer><ChartContainer><LineChart title='Temperatura' data={temperaturaLine} icono={true}/> </ChartContainer > </FadeIn> </> 
                    }
                  })()}
                 
          </Col>          
        </Row>
        </Grid>
    )
}
export default DashUser
