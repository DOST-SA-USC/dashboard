'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { type: 'MERIT', count: 120 },
  { type: 'RA 7687', count: 95 },
  { type: 'JLSS RA 7687', count: 80 },
  { type: 'JLSS MERIT', count: 65 },
  { type: 'JLSS RA 10612', count: 50 },
];

const chartConfig = {
  count: {
    label: 'Number of Scholars',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export default function RadarChartComponent() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-full max-h-[250px] w-full"
    >
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="type" />
        <PolarGrid />
        <Radar
          dataKey="count"
          fill="var(--chart-1)"
          fillOpacity={0.6}
          dot={{
            r: 4,
            fillOpacity: 1,
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
}
