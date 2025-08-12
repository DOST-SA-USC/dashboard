'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Cell } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

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

const chartColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export default function PieChartComponent(props: {
  data: { year: string | null; count: number }[];
}) {
  const totalCount = React.useMemo(() => {
    return props.data.reduce(
      (acc, curr) => Number(acc) + Number(curr.count),
      0
    );
  }, [props.data]);

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
          data={props.data}
          dataKey="count"
          nameKey="year"
          innerRadius={60}
          strokeWidth={5}
        >
          {props.data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartColors[index % chartColors.length]}
            />
          ))}
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
