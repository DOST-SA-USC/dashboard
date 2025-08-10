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

const chartData = [
  { program: 'BS Computer Science', count: 120 },
  { program: 'BS Information Technology', count: 95 },
  { program: 'BS Information Systems', count: 80 },
  { program: 'BS Applied Physics', count: 65 },
  { program: 'BS Pharmacy', count: 110 },
  { program: 'BS Architecture', count: 50 },
  { program: 'BS Chemistry', count: 70 },
  { program: 'BS Marine Biology', count: 60 },
  { program: 'BS Psychology', count: 85 },
  { program: 'BS Chemical Engineering', count: 55 },
  { program: 'BS Civil Engineering', count: 90 },
  { program: 'BS Computer Engineering', count: 75 },
  { program: 'BS Electrical Engineering', count: 40 },
  { program: 'BS Electronics Engineering', count: 45 },
  { program: 'BS Industrial Engineering', count: 35 },
  { program: 'BS Mechanical Engineering', count: 30 },
  { program: 'BS Nutrition and Dietetics', count: 25 },
];

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

export default function BarChartComponent() {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[256px] w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
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
          {chartData.map((_, index) => (
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
