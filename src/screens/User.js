import React, {useState} from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import WeatherComponent from "../components/WheatherInfo/WeatherInfo";
import Assistant from '../components/Assistent/Assistent'
import useStyles, { MiniContainer, Container, ChartContainer} from './styles'
import Navbar from "../components/Navbar/Navbar";
import LineChart from "../components/LineChart/LineChart";
import Sidebar from "../components/Sidebar/Sidebar";
import WeatherStation from "../components/WeatherStation/WeatherStation";
import ScatterChart from '../components/ScatterChart/ScatterChart';
import Select from 'react-select'

const tipoGrafico = [
  { value: 'linea', label: 'Linea' },
  { value: 'punto', label: 'Puntos' }
]


const User = ({weather, city, toggle, isOpen}) => {
    const classes = useStyles();
    let initialGrafico = { graficoKey: 'linea'}
    const [grafico, setGrafico] = useState(initialGrafico);
    const updateGrafico = value => {
      setGrafico({ ...grafico, graficoKey: value });
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

     const temperaturaScatter = [
        ['Dia','Temperatura'],
        ['Lun', 12],
        ['Mar', 5.5],
        ['Mier', 14],
        ['Jue', 5],
        ['Vier', 3.5],
        ['Sab', 7],
        ['Dom', 7]
      ]
      const optionsTemperatura ={
        legend: 'none',
        colors: ['rgb(255, 38, 28)'],
      }

      const humedadScatter = [
        ['Dia','Humedad'],
        ['Lun', 12],
        ['Mar', 5.5],
        ['Mier', 14],
        ['Jue', 5],
        ['Vier', 3.5],
        ['Sab', 7],
        ['Dom', 7]
      ]
      const optionsHumedad ={
        legend: 'none',
        colors: ['rgb(20, 39, 155)'],
      }


     
    return (
        <div className={classes.root}>
        <Router>
        <Grid container spacing={6}>
        <Navbar  toggle={toggle}/>
        <Sidebar isOpen={isOpen} toggle={toggle} />
          <Grid item xs>
          <MiniContainer>
          <WeatherStation weather={weather} city={city}/>
          <Assistant/>
          </MiniContainer>      
          </Grid>
  
          <Grid item xs>
          <Container>
          <WeatherComponent weather={weather} city={city}/>
          </Container>
           
          </Grid>
          <Grid item xs>
            <Select 
             value={tipoGrafico.filter(({ value }) => value === (grafico.graficoKey))}
              getOptionValue={({ value }) => value}
              onChange={({ value }) => updateGrafico(value)}options={tipoGrafico} className ='selectChart' placeholder='Elige el tipo de grafico'
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: 'primary50',
                  primary: 'black',
                },
              })}/>

            {(() => {
              console.log(grafico)
                    switch (grafico.graficoKey  ) {
                      case 'linea':
                        return <> <ChartContainer><LineChart title='Humedad' data={humedadLine} icono={false}/> 
                            </ChartContainer><ChartContainer><LineChart title='Temperatura' data={temperaturaLine} icono={true}/> </ChartContainer ></> 
                      case 'punto':
                        return <><ChartContainer><ScatterChart title='Temperatura'  icono={true} data={temperaturaScatter} options={optionsTemperatura}/>
                            </ChartContainer><ChartContainer><ScatterChart title='Humedad'  icono={false} data={humedadScatter} options={optionsHumedad}/> </ChartContainer> </>
                      default:
                        return null;
                    }
                  })()}
          </Grid>        
        </Grid>
        </Router>
      </div>
    )
}

export default User
