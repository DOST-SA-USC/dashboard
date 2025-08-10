'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { year: 'Year 1', count: 120, fill: 'var(--chart-1)' },
  { year: 'Year 2', count: 95, fill: 'var(--chart-2)' },
  { year: 'Year 3', count: 80, fill: 'var(--chart-3)' },
  { year: 'Year 4', count: 65, fill: 'var(--chart-4)' },
  { year: 'Year 5', count: 50, fill: 'var(--chart-5)' },
];

const chartConfig = {
  count: {
    label: 'Number of Students',
  },
  'Year 1': {
    label: 'Year 1',
    color: 'var(--chart-1)',
  },
  'Year 2': {
    label: 'Year 2',
    color: 'var(--chart-2)',
  },
  'Year 3': {
    label: 'Year 3',
    color: 'var(--chart-3)',
  },
  'Year 4': {
    label: 'Year 4',
    color: 'var(--chart-4)',
  },
  'Year 5': {
    label: 'Year 5',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export default function PieChartComponent() {
  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-full max-h-[250px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="year"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalCount.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Students
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
