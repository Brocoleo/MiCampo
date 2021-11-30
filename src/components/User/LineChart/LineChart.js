import React from 'react';
import { Line } from 'react-chartjs-2';



const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = ({title, data, icono}) => (
  <>
    <div className='header'>
      
      <h1 className='title'>{title+``}
      {icono}
       
       </h1>
      
    </div>
    <Line data={data} options={options} />
  </>
);

export default LineChart;