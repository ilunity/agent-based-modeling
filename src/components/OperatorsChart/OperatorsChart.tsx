import React from 'react';
import { OperatorsChartProps } from './OperatorsChart.types';
import { Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export const OperatorsChart: React.FC<OperatorsChartProps> = ({ data }) => {
  return (
    <BarChart width={550} height={400} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis domain={ [0, 30] }>
        <Label
          position={ 'insideLeft' }
          angle={ -90 }
        >
          Курс
        </Label>
      </YAxis>
      <Tooltip />
      <Legend />
      <Bar dataKey='count' fill='#8884d8' />
    </BarChart>
  );
};
