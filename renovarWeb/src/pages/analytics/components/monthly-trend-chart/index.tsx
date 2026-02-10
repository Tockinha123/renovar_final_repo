import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'

const data = [
  { day: '1', Atual: 300 },
  { day: '2', Atual: 300 },
  { day: '3', Atual: 500 },
  { day: '3', Atual: 600, Predição: 600 },
  { day: '4', Predição: 700 },
  { day: '5', Predição: 800 },
  { day: '6', Predição: 900 },
]

const chartConfig = {
  xd: { label: 'XD', color: '#8884d8' },
  vitao: { label: 'Vitao', color: 'red' },
}

export function MonthlyTrendChart() {
  return (
    <div className="flex flex-col gap-4 items-center rounded-lg border border-line-gray p-4 pl-0">
      <ChartContainer config={chartConfig} className="w-full">
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Atual"
            stroke="#EF4444"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Predição"
            stroke="var(--color-renovar-primary)"
            strokeWidth={3}
            strokeDasharray={'6 3'}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
