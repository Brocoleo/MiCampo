import React, {useState} from 'react'
//import WeatherComponent from "../components/WheatherInfo/WeatherInfo";
import Assistant from '../components/Assistent/Assistent'
import LineChart from "../components/LineChart/LineChart";
import WeatherStation from "../components/WeatherStation/WeatherStation";
import ScatterChart from '../components/ScatterChart/ScatterChart';
import Select from 'react-select'
import Grid from '@material-ui/core/Grid';
import  { MiniContainer, ChartContainer} from './styles'

const DashUser = () => {  let initialGrafico = { graficoKey: 'linea'}
  const [grafico, setGrafico] = useState(initialGrafico);

  const tipoGrafico = [
    { value: 'linea', label: 'Linea' },
    { value: 'punto', label: 'Puntos' }
  ]

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

 
    
    const updateGrafico = value => {
        setGrafico({ ...grafico, graficoKey: value });
      };  

    return (
        <Grid container spacing={6}> 
       
         {/*<Grid item xs>
          <Container>
          <WeatherComponent />
          </Container>      
         </Grid> */}
        <Grid item xs>
          <MiniContainer>
          <WeatherStation />
          <Assistant/>
          </MiniContainer>      
          </Grid>

          <Grid item xs>
            <Select 
             value={tipoGrafico.filter(({ value }) => value === (grafico.graficoKey))}
              getOptionValue={({ value }) => value}
              onChange={({ value }) => updateGrafico(value)}options={tipoGrafico} className ='selectChart' placeholder='Elige el tipo de grafico'
              theme={(theme) => ({
                ...theme,
                borderRadius: '12px',
                colors: {
                  ...theme.colors,
                  primary25: 'primary50',
                  primary: '#134E5E',
                },
              })}/>

            {(() => {
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
    )
}
export default DashUser
