import { Button, Container, CssBaseline, Stack } from '@mui/material';
import React, { Reducer, useEffect, useReducer, useRef, useState } from 'react';
import { Simulator, SimulatorInfo } from '../../models';
import { OperatorsChart } from '../OperatorsChart';
import { ChartData } from '../Chart/Chart.types';
import { ChartDataAction, chartDataReducer } from './reducer';
import { TICKS_IN_DAY, TICKS_IN_HOUR } from '../../utils/consts';
import { Chart } from '../Chart';
import { Header } from '../Header';

export const App: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [statistic, setStatistic] = useState<SimulatorInfo | null>(null);
  const [chartData, chartDataDispatch] = useReducer<Reducer<ChartData, ChartDataAction>>(chartDataReducer, []);
  const [lastHour, setLastHour] = useState<number>(0);
  const [lastArrivalNumber, setLastArrivalNumber] = useState<number>(0);

  const simulator = useRef(new Simulator(6));

  const toggleActive = () => {
    setIsActive(prevState => !prevState);
  };

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      simulator.current.step(time);
      setStatistic(simulator.current.getInfo());
      setTime(prevState => prevState + 1);

      const todayTicks = time % TICKS_IN_DAY;
      const newHour = Math.floor(todayTicks / TICKS_IN_HOUR);

      if (newHour > lastHour || newHour === 0 && lastHour === 23 && statistic !== null) {
        const arrivals = statistic.bank.arrivalsCount;
        chartDataDispatch({
          type: 'updateChart',
          payload: { hour: newHour, number: arrivals - lastArrivalNumber },
        });
        setLastHour(newHour);
        setLastArrivalNumber(arrivals);
      }

    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time, lastHour, lastArrivalNumber]);

  return (
    <Container maxWidth={'xl'}>
      <CssBaseline />
      <Stack spacing={6} alignItems={'center'} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <Header time={lastHour} statistic={statistic} />
          <Button onClick={toggleActive} variant={'contained'}>
            {isActive ? 'Стоп' : 'Старт'}
          </Button>
        </Stack>
        {statistic &&
          <Stack direction={'row'} spacing={8}>
            <OperatorsChart
              data={[
                { name: 'Free operators', count: statistic.bank.service.freeOperators.length },
                { name: 'Busy operators', count: statistic.bank.service.busyOperators.length },
                { name: 'Queue', count: statistic.bank.queue.customers.length },
              ]}
            />
            <Chart chartData={chartData} />
          </Stack>
        }
      </Stack>
    </Container>
  );
};
