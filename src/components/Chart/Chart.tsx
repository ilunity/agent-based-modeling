import React from 'react';
import { Area, AreaChart, CartesianGrid, Label, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartProps } from './Chart.types';


export const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const data = chartData.map(((value) => {
    return {
      number: value.number,
      hour: `${value.hour}:00`,
    };
  }));

  return (
    <AreaChart
      width={550}
      height={400}
      data={data.length === 1
        ? [...data, 1]
        : data
      }
      margin={{
        bottom: 30,
      }}
    >
      <defs>
        <linearGradient id='colorArrivals' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.4} />
          <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis
        domain={[0, 24]}
        dataKey={'hour'}
      >
        <Label position={'bottom'}>
          Hour
        </Label>
      </XAxis>
      <YAxis domain={[0, 25]}>
        <Label
          position={'insideLeft'}
          angle={-90}
        >
          Arrivals
        </Label>
      </YAxis>
      <Tooltip />
      <Area
        type='linear'
        dataKey='number'
        stroke='#82ca9d'
        strokeWidth={3}
        fill='url(#colorArrivals)'
        isAnimationActive={false}
      />
    </AreaChart>
  );
};
