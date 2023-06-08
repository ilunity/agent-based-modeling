import React from 'react';
import { HeaderProps } from './Header.types';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { roundNumber } from '../../utils/round-number';
import { MINUTES_IN_TICK } from '../../utils/consts';

export const Header: React.FC<HeaderProps> = ({ time, statistic }) => {
  return (
    <Card sx={{ width: 400, height: 170 }}>
      <CardHeader title={'Bank agent based modeling'} />
      <CardContent>
        <Typography variant={'h6'}>
          {`Time: ${time}:00`}
        </Typography>
        {statistic && statistic.bank.avgServingTime !== 0 &&
          <Typography variant={'h6'}>
            {`Avg Serving time: ${roundNumber(statistic.bank.avgServingTime * MINUTES_IN_TICK)} min.`}
          </Typography>
        }
      </CardContent>
    </Card>
  );
};
