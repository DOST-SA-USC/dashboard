import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Loading...</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
        <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
        <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <Skeleton className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
