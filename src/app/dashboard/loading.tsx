import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      <LoaderCircle className="text-secondary size-8 animate-spin" />
    </div>
  );
}
