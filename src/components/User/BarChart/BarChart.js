import React from 'react';
import { Bar } from 'react-chartjs-2';


const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  
};

const BarChart = ({title, data, icono}) => (
  <>
    <div className='header'>
      
      <h1 className='title'>{title+``}
      {icono}
       
       </h1>
      
    </div>
    <Bar data={data} options={options} />
  </>
);

export default BarChart;