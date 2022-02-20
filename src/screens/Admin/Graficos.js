import React, {useState, useEffect, useCallback} from 'react'
import FadeIn from 'react-fade-in';
import axios from 'axios';
import LineChart from "../../components/LineChart/LineChart";
import { IconContext } from "react-icons";
import BarChart from '../../components/BarChart/BarChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AiOutlineLineChart, AiOutlineBarChart} from "react-icons/ai";
import { styled } from '@mui/material/styles';
import  { ChartContainer} from '../styles'
import Cookies from "js-cookie";
import pesoLogo from '../../assets/peso.svg';
import solIcon from '../../assets/sun.svg'
import infraIcon from '../../assets/infrarrojo.png'
import chipIcon from '../../assets/chip.svg'
import { Container, Row, Col } from 'react-grid-system';
import Loading from '../../components/Loading'
import {WeatherAdminContainer} from '../styles'
import WeatherStation from "../../components/Admin/WeatherStation/WeatherStation";

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

  const historialUrl='https://sensores-api-citra.herokuapp.com/api/v1/profile/my-historial/'
const Graficos = () => {
    const sensor = Cookies.get("sensor");
    const token = Cookies.get("access");
    const [loading, setLoading] = useState(false);
    const [verGraficas, setVerGraficas] = useState(true);
    const [grafico, setGrafico] = useState('linea');
    const [indices, setIndices] = useState();
    const [temperatura, setTemperatura] = useState();
    const [humedad, setHumedad] = useState();
    const [peso, setPeso] = useState();
    const [humedadRelativa, setHumedadRelativa] = useState();
    const [direccionViento, setDireccionViento] = useState();
    const [luminosidad, setLuminosidad] = useState();
    const [temperaturaInfrarroja, setTemperaturaInfrarroja] = useState();
    const [valorOtroSensor, setValorOtroSensor] = useState();
    const humedadIcon =  <svg height="30" viewBox="-88 0 464 464" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m288 314.855469c0 82.367187-64.472656 149.144531-144 149.144531s-144-66.777344-144-149.144531c0-114.855469 144-314.855469 144-314.855469s144 200 144 314.855469zm0 0" fill="#60a2d7"/></svg>
    const pesoIcon = <img src={pesoLogo} alt="peso"/>;
    const luminosidadIcon = <img src={solIcon} alt="luminosidad"/>;
    const infrarrojoIcon = <img src={infraIcon} alt="infrarrojo"/>;
    const sensorIcon = <img src={chipIcon} alt="otro sensor" style={{width: 30, height: 30, position: 'unset'}}/>;
    const vientoIcon = <svg height="40" viewBox="-88 0 464 1" width="40" xmlns="http://www.w3.org/2000/svg"><g fill="#60a2d7"><path d="m356 32.035156c-20.355469.390625-40.644531-2.40625-60.136719-8.289062-18.117187-5.507813-36.996093-8.109375-55.925781-7.710938-18.90625-.394531-37.753906 2.207032-55.839844 7.710938-19.480468 5.882812-39.757812 8.679687-60.097656 8.289062-20.351562.390625-40.640625-2.40625-60.128906-8.289062-18.097656-5.503906-36.957032-8.105469-55.871094-7.710938-4.417969 0-8-3.582031-8-8 0-4.417968 3.582031-7.9999998 8-7.9999998 20.347656-.3906252 40.636719 2.4062498 60.121094 8.2890628 18.101562 5.503906 36.960937 8.109375 55.878906 7.710937 18.902344.394532 37.75-2.207031 55.839844-7.710937 19.476562-5.878907 39.753906-8.675781 60.097656-8.2890628 20.355469-.3867182 40.648438 2.4062498 60.140625 8.2890628 18.117187 5.507812 36.992187 8.109375 55.921875 7.710937 18.917969.398438 37.78125-2.207031 55.886719-7.710937 19.484375-5.878907 39.765625-8.675781 60.113281-8.2890628 4.417969 0 8 3.5820318 8 7.9999998 0 4.417969-3.582031 8-8 8-18.917969-.394531-37.78125 2.207032-55.886719 7.710938-19.484375 5.878906-39.765625 8.675781-60.113281 8.289062zm0 0"/><path d="m356 80.035156c-20.355469.390625-40.644531-2.40625-60.136719-8.289062-18.117187-5.507813-36.996093-8.109375-55.925781-7.710938-18.90625-.394531-37.753906 2.207032-55.839844 7.710938-19.480468 5.882812-39.757812 8.679687-60.097656 8.289062-20.351562.390625-40.640625-2.40625-60.128906-8.289062-18.097656-5.503906-36.957032-8.105469-55.871094-7.710938-4.417969 0-8-3.582031-8-8 0-4.417968 3.582031-8 8-8 20.347656-.390625 40.636719 2.40625 60.121094 8.289063 18.101562 5.503906 36.960937 8.109375 55.878906 7.710937 18.902344.394532 37.75-2.207031 55.839844-7.710937 19.476562-5.878907 39.753906-8.675781 60.097656-8.289063 20.355469-.386718 40.648438 2.40625 60.140625 8.289063 18.117187 5.507812 36.992187 8.109375 55.921875 7.710937 18.917969.398438 37.78125-2.207031 55.886719-7.710937 19.484375-5.878907 39.765625-8.675781 60.113281-8.289063 4.417969 0 8 3.582032 8 8 0 4.417969-3.582031 8-8 8-18.917969-.394531-37.78125 2.207032-55.886719 7.710938-19.484375 5.878906-39.765625 8.675781-60.113281 8.289062zm0 0"/><path d="m356 128.035156c-20.355469.390625-40.644531-2.40625-60.136719-8.289062-18.117187-5.507813-36.996093-8.109375-55.925781-7.710938-18.90625-.394531-37.753906 2.207032-55.839844 7.710938-19.480468 5.882812-39.757812 8.679687-60.097656 8.289062-20.351562.390625-40.640625-2.40625-60.128906-8.289062-18.097656-5.503906-36.957032-8.105469-55.871094-7.710938-4.417969 0-8-3.582031-8-8 0-4.417968 3.582031-8 8-8 20.347656-.390625 40.636719 2.40625 60.121094 8.289063 18.101562 5.503906 36.960937 8.109375 55.878906 7.710937 18.902344.394532 37.75-2.207031 55.839844-7.710937 19.476562-5.878907 39.753906-8.675781 60.097656-8.289063 20.355469-.386718 40.648438 2.40625 60.140625 8.289063 18.117187 5.507812 36.992187 8.109375 55.921875 7.710937 18.917969.398438 37.78125-2.207031 55.886719-7.710937 19.484375-5.878907 39.765625-8.675781 60.113281-8.289063 4.417969 0 8 3.582032 8 8 0 4.417969-3.582031 8-8 8-18.917969-.394531-37.78125 2.207032-55.886719 7.710938-19.484375 5.878906-39.765625 8.675781-60.113281 8.289062zm0 0"/><path d="m356 176.035156c-20.355469.390625-40.644531-2.40625-60.136719-8.289062-18.117187-5.507813-36.996093-8.109375-55.925781-7.710938-18.90625-.394531-37.753906 2.207032-55.839844 7.710938-19.480468 5.882812-39.757812 8.679687-60.097656 8.289062-20.351562.390625-40.640625-2.40625-60.128906-8.289062-18.097656-5.503906-36.957032-8.105469-55.871094-7.710938-4.417969 0-8-3.582031-8-8 0-4.417968 3.582031-8 8-8 20.347656-.390625 40.636719 2.40625 60.121094 8.289063 18.101562 5.503906 36.960937 8.109375 55.878906 7.710937 18.902344.394532 37.75-2.207031 55.839844-7.710937 19.476562-5.878907 39.753906-8.675781 60.097656-8.289063 20.355469-.386718 40.648438 2.40625 60.140625 8.289063 18.117187 5.507812 36.992187 8.109375 55.921875 7.710937 18.917969.398438 37.78125-2.207031 55.886719-7.710937 19.484375-5.878907 39.765625-8.675781 60.113281-8.289063 4.417969 0 8 3.582032 8 8 0 4.417969-3.582031 8-8 8-18.917969-.394531-37.78125 2.207032-55.886719 7.710938-19.484375 5.878906-39.765625 8.675781-60.113281 8.289062zm0 0"/></g></svg>;
    const temperaturaIcon = <svg id="Layer_1"  height="42" viewBox="0 0 511.98 461.98" width="42" xmlns="http://www.w3.org/2000/svg"><g><g fill="#4f667a"><path d="m315.494 61.06h75.774c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-75.774c-4.143 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5z"/><path d="m315.494 95.689h37.887c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-37.887c-4.143 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5z"/><path d="m391.269 115.689h-75.774c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h75.774c4.143 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/><path d="m315.494 165.318h37.887c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-37.887c-4.143 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5z"/><path d="m391.269 184.803h-75.774c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h75.774c4.143 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/><path d="m315.494 234.432h37.887c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-37.887c-4.143 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5z"/><path d="m391.269 254.569h-75.774c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h75.774c4.143 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/><path d="m353.381 289.198h-37.887c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h37.887c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z"/></g><path d="m326.741 405.22c0 28.8-11.3 55.79-31.8 76.02-20.14 19.86-46.7 30.74-74.95 30.74-.51 0-1.02 0-1.53-.01-4.52-.07-8.99-.41-13.41-1.04-22.58-3.18-43.56-13.54-60.11-29.93-19.78-19.58-31.04-45.58-31.7-73.19-.89-37.42 17.88-72.49 49.24-92.56v-257.75c0-26.52 18.04-48.9 42.5-55.51 4.78-1.3 9.81-1.99 15-1.99 31.7 0 57.5 25.79 57.5 57.5v257.75c30.49 19.54 49.26 53.61 49.26 89.97z" fill="#e9f5ff"/><path d="m326.741 405.22c0 28.8-11.3 55.79-31.8 76.02-20.14 19.86-46.7 30.74-74.95 30.74-18.69 0-30 0-30 0 5.08 0 10.11-.35 15.06-1.05 22.54-3.16 43.38-13.4 59.89-29.69 20.51-20.23 31.8-47.22 31.8-76.02 0-36.36-18.77-40.25-49.26-59.79v-287.93c0-26.52-18.05-48.9-42.5-55.51 4.78-1.3 9.81-1.99 15-1.99 31.7 0 57.5 25.79 57.5 57.5v257.75c30.49 19.54 49.26 53.61 49.26 89.97z" fill="#cdeaf7"/><g><path d="m296.741 405.37c0 20.7-8.12 40.11-22.87 54.65-14.47 14.28-33.61 22.11-53.96 22.11-.35 0-.69 0-1.03-.01-3.84-.05-7.64-.4-11.38-1.01-15.55-2.57-29.97-9.91-41.45-21.28-14.24-14.09-22.35-32.77-22.82-52.58-.66-27.97 13.94-54.11 38.1-68.23 6.87-4.01 11.15-11.46 11.15-19.42v-261.95c0-10.66 6.1-19.93 15-24.49 3.75-1.93 8-3.01 12.5-3.01 15.16 0 27.49 12.34 27.49 27.5v261.95c0 7.96 4.28 15.41 11.15 19.42 23.51 13.74 38.12 39.16 38.12 66.35z" fill="#ff6e6e"/><path d="m296.741 405.37c0 20.7-8.12 40.11-22.87 54.65-14.47 14.28-33.61 22.11-53.96 22.11-.35 0-.69 0-1.03-.01-3.84-.05-7.64-.4-11.38-1.01 15.57-2.54 29.93-9.8 41.37-21.09 14.75-14.54 22.87-33.95 22.87-54.65 0-27.19-14.61-52.61-38.12-66.35-6.87-4.01-11.15-11.46-11.15-19.42v-261.95c0-10.66-6.1-19.92-14.99-24.49 3.75-1.93 8-3.01 12.5-3.01 15.16 0 27.49 12.34 27.49 27.5v261.95c0 7.96 4.28 15.41 11.15 19.42 23.51 13.74 38.12 39.16 38.12 66.35z" fill="#f44e92"/></g><path d="m247.471 57.65v65.54h-54.99v-65.54c0-10.66 6.1-19.93 15-24.49 3.75-1.93 8-3.01 12.5-3.01 15.16 0 27.49 12.34 27.49 27.5z" fill="#4f667a"/><path d="m247.471 57.65v65.54h-25v-65.54c0-10.66-6.1-19.92-14.99-24.49 3.75-1.93 8-3.01 12.5-3.01 15.16 0 27.49 12.34 27.49 27.5z" fill="#3a5366"/></g></svg>;

    const getHistorial = useCallback(async () => {
      const config = {headers: { Authorization: `Bearer ${token}` }};
      axios.get(historialUrl+ sensor, config).then((response) => {
        console.log(response.data)
        const largo = response.data.length
        const inicio = response.data.length-30
        const datos = response.data.slice(inicio, largo);
        if(response && datos.length > 0){
          setIndices(datos.map(item => item.id)) 
          setTemperatura(datos.map(item => item.temperatura)) 
          setHumedad(datos.map(item => item.humedad))
          setPeso(datos.map(item => item.peso))
          setHumedadRelativa(datos.map(item => item.humedadRelativa))
          setDireccionViento(datos.map(item => item.direccionViento))
          setLuminosidad(datos.map(item => item.luminosidad))
          setTemperaturaInfrarroja(datos.map(item => item.temperaturaInfrarroja))
          setValorOtroSensor(datos.map(item => item.valorOtroSensor))
        }else{
          setVerGraficas(false)
        }

     });
    }, [ sensor, token])

    useEffect(() => {
      getHistorial()
    }, [getHistorial, sensor])

    setTimeout(() => {
      setLoading(true)
    }, 1000);

    const handleAlignment = (event, newAlignment) => {
      setGrafico(newAlignment);
    };

    const temperaturaLine = {
        labels: indices,
        datasets: [
          {
            label: 'temperatura de la estacion',
            data: temperatura,
            fill: true,
            backgroundColor: 'rgba(255, 38, 38, 0.2)',
            borderColor: 'rgb(255, 38, 28)',
          },
        ],
      };
      const humedadLine = {
        labels: indices,
        datasets: [
          {
            label: 'humedad de la estacion',
            data: humedad,
            fill: true,
            backgroundColor: 'rgba(17, 39, 155,0.2)',
            borderColor: 'rgb(17, 39, 155)',
          },
        ],
      };
      const humedadRelativaLine = {
        labels: indices,
        datasets: [
          {
            label: 'humedad relativa de la estacion',
            data: humedadRelativa,
            fill: true,
            backgroundColor: 'rgba(152, 186, 231,0.2)',
            borderColor: 'rgb(152, 186, 231)',
          },
        ],
      };
      const direccionVientoLine = {
        labels: indices,
        datasets: [
          {
            label: 'direccion viento de la estacion',
            data: direccionViento,
            fill: true,
            backgroundColor: 'rgba(0, 157, 174,0.2)',
            borderColor: 'rgb(0, 157, 174)',
          },
        ],
      };

      const luminosidadLine = {
        labels: indices,
        datasets: [
          {
            label: 'luminosidad de la estacion',
            data: luminosidad,
            fill: true,
            backgroundColor: 'rgba(255, 206, 69,0.2)',
            borderColor: 'rgb(255, 206, 69)',
          },
        ],
      };

      const infrarrojaLine = {
        labels: indices,
        datasets: [
          {
            label: 'temperatura infrarroja de la estacion',
            data: temperaturaInfrarroja,
            fill: true,
            backgroundColor: 'rgba(255, 84, 3,0.2)',
            borderColor: 'rgb(255, 84, 3)',
          },
        ],
      };

      const sensorOtroLine = {
        labels: indices,
        datasets: [
          {
            label: 'otro sensor de la estacion',
            data:  valorOtroSensor,
            fill: true,
            backgroundColor: 'rgba(200, 198, 198,0.2)',
            borderColor: 'rgb(200, 198, 198)',
          },
        ],
      };

      const pesoLine = {
        labels: indices,
        datasets: [
          {
            label: 'pesos de la estacion',
            data: peso,
            fill: true,
            backgroundColor: 'rgba(17, 101, 48,0.2)',
            borderColor: 'rgb(17, 101, 48)',
          },
        ],
      };

  
    return (<>
    { verGraficas ? (
         loading && temperatura && humedad && humedadRelativa && direccionViento? (  <div>
      <FadeIn className='tipoGrafica'>
          <WeatherAdminContainer >
          <WeatherStation title={sensor} temperatura={temperatura[temperatura.length - 1]} 
          humedad={humedad[humedad.length -1]} peso={peso[peso.length -1]}
          humedadRelativa={humedadRelativa[humedadRelativa.length -1]}
          direccionViento={direccionViento[direccionViento.length -1]} 
          luminosidad={luminosidad[luminosidad.length - 1]}/>
          </WeatherAdminContainer>  
       
      <StyledToggleButtonGroup  className="btnGraficas" aria-label="tipo grafica" value={grafico} exclusive onChange={handleAlignment}  size="small">
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
                return  <Container> <FadeIn> <Row> { humedad && humedad[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Humedad' data={humedadLine} icono={humedadIcon}/></ChartContainer></Col>) : (<div></div>)}
                { temperatura && temperatura[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Temperatura' data={temperaturaLine} icono={temperaturaIcon}/> </ChartContainer></Col>) : (<div></div>)}
                { peso && peso[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Peso' data={pesoLine} icono={pesoIcon}/> </ChartContainer ></Col>) : (<div></div>)} 
                { humedadRelativa && humedadRelativa[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Humedad Relativa' data={humedadRelativaLine} icono={humedadIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { direccionViento && direccionViento[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Viento' data={direccionVientoLine} icono={vientoIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { luminosidad && luminosidad[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Luminosidad' data={luminosidadLine} icono={luminosidadIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { temperaturaInfrarroja && temperaturaInfrarroja[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Temperatura Infrarroja' data={infrarrojaLine} icono={infrarrojoIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { valorOtroSensor && valorOtroSensor[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Otro Sensor' data={sensorOtroLine} icono={sensorIcon}/> </ChartContainer ></Col>) : (<div></div>)} </Row> </FadeIn> </Container>
              case 'barra':
                return <Container> <FadeIn> <Row> { humedad && humedad[0]!==null? (<Col sm={4}><ChartContainer><BarChart title='Humedad' data={humedadLine} icono={humedadIcon}/></ChartContainer></Col>) : (<div></div>)}
                { temperatura && temperatura[0]!==null? (<Col sm={4}><ChartContainer><BarChart title='Temperatura' data={temperaturaLine} icono={temperaturaIcon}/> </ChartContainer></Col>) : (<div></div>)}
                { peso && peso[0]!==null? (<Col sm={4}><ChartContainer><BarChart title='Peso' data={pesoLine} icono={pesoIcon}/> </ChartContainer ></Col>) : (<></>)} 
                { humedadRelativa && humedadRelativa[0]!==null? (<Col sm={4}><ChartContainer><BarChart title='Humedad Relativa' data={humedadRelativaLine} icono={humedadIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { direccionViento && direccionViento[0]!==null? (<Col sm={4}><ChartContainer><BarChart title='Viento' data={direccionVientoLine} icono={vientoIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { luminosidad && luminosidad[0]!==null? (<Col sm={4}><ChartContainer><BarChart title='Luminosidad' data={luminosidadLine} icono={luminosidadIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { temperaturaInfrarroja && temperaturaInfrarroja[0]!==null? (<Col sm={4}><ChartContainer><BarChart title='Temperatura Infrarroja' data={infrarrojaLine} icono={infrarrojoIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { valorOtroSensor && valorOtroSensor[0]!==null? (<Col sm={4}><ChartContainer><BarChart title='Otro Sensor' data={sensorOtroLine} icono={sensorIcon}/> </ChartContainer ></Col>) : (<div></div>)} </Row> </FadeIn> </Container>
              default:
                return <Container> <FadeIn>  <Row>{ humedad && humedad[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Humedad' data={humedadLine} icono={humedadIcon}/></ChartContainer></Col>) : (<div></div>)}
                { temperatura && temperatura[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Temperatura' data={temperaturaLine} icono={temperaturaIcon}/> </ChartContainer></Col>) : (<div></div>)}
                { peso && peso[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Peso' data={pesoLine} icono={pesoIcon}/> </ChartContainer ></Col>) : (<></>)} 
                { humedadRelativa && humedadRelativa[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Humedad Relativa' data={humedadRelativaLine} icono={humedadIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { direccionViento && direccionViento[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Viento' data={direccionVientoLine} icono={vientoIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { luminosidad && luminosidad[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Luminosidad' data={luminosidadLine} icono={luminosidadIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { temperaturaInfrarroja && temperaturaInfrarroja[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Temperatura Infrarroja' data={infrarrojaLine} icono={infrarrojoIcon}/> </ChartContainer ></Col>) : (<div></div>)}
                { valorOtroSensor && valorOtroSensor[0]!==null? (<Col sm={4}><ChartContainer><LineChart title='Otro Sensor' data={sensorOtroLine} icono={sensorIcon}/> </ChartContainer ></Col>) : (<div></div>)} </Row>  </FadeIn> </Container>
            }
          })()}
    </div>):( <div className="loading"><Loading /> </div>)
    ):(<FadeIn>
          <br />
          <br />
          <br />
          <h1 className="bienvenidaSensores">Sensor sin Historial</h1>
          </FadeIn>)}

    </>   
    )
}

export default Graficos
