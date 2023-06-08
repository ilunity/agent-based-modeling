export interface ChartPointData {
  hour: number;
  number: number;
}

export type ChartData = ChartPointData[];

export interface ChartProps {
  chartData: ChartData;
}
