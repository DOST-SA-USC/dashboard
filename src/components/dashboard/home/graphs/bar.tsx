'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import DATA_JSON from '@/data/setup.json';

const chartConfig = {
  count: {
    label: 'count',
  },
} satisfies ChartConfig;

const chartColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export default function BarChartComponent(props: {
  data: { program: string | null; count: number }[];
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[256px] w-full"
    >
      <BarChart accessibilityLayer data={props.data}>
        <CartesianGrid vertical={false} />
        <XAxis
          className="hidden xl:block"
          dataKey="program"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}
          tickFormatter={(value: string) =>
            DATA_JSON.programAliases[
              value as keyof typeof DATA_JSON.programAliases
            ] || value
          }
        />
        <ChartTooltip
          content={
            <ChartTooltipContent className="w-[150px]" nameKey="count" />
          }
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {props.data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartColors[index % chartColors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
