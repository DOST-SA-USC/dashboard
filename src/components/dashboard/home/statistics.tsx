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

import {
  getProgramCounts,
  getYearLevelCounts,
  getScholarshipCounts,
} from '@/lib/db/users';

const Statistics = async () => {
  const [programCounts, yearLevelCounts, scholarshipCounts] = await Promise.all(
    [getProgramCounts(), getYearLevelCounts(), getScholarshipCounts()]
  );

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
          <BarChart data={programCounts} />
        </CardContent>
      </Card>

      <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Year Level Distribution</CardTitle>
            <CardDescription>
              Scholar count across different year levels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={yearLevelCounts} />
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
            <RadarChart data={scholarshipCounts} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Statistics;
