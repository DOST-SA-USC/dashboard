import React from 'react';
import BarChart from './graphs/bar';
import PieChart from './graphs/pie';
import RadarChart from './graphs/radar';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

const Statistics = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Scholar Distribution</CardTitle>
          <CardDescription>
            Scholar count across different programs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart />
        </CardContent>
      </Card>

      <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Year Distribution</CardTitle>
            <CardDescription>
              Scholar count across different years.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Type Distribution</CardTitle>
            <CardDescription>
              Scholar count across different scholarship types.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadarChart />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Statistics;
