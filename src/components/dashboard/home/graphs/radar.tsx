'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  count: {
    label: 'count',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export default function RadarChartComponent(props: {
  data: { type: string | null; count: number }[];
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-full max-h-[250px] w-full"
    >
      <RadarChart data={props.data}>
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
