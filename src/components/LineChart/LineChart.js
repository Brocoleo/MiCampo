import React from 'react';
import { Line } from 'react-chartjs-2';




const LineChart = ({title, data}) => (
  <>
    <div className='header'>
      
      <h1 className='title'>{title+``}
       
       </h1>
      
    </div>
    <Line data={data}  />
  </>
);

export default LineChart;