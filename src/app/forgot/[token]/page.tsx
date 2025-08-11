import { Card } from '@/components/ui/card';

import Valid from '../valid';

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <Card className="w-[90%] md:w-md">
      <Valid token={token} />
    </Card>
  );
}
