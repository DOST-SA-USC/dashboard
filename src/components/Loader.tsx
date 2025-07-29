import Image from 'next/image';

export default function Loader() {
  return (
    <div className="bg-primary dark:bg-background animate-fade-slide-up flex h-screen w-full flex-col items-center justify-center p-8 text-white">
      <Image
        src="/loading.gif"
        width={128}
        height={128}
        alt="logo"
        unselectable="on"
        unoptimized
      />
      <h1 className="text-lg font-bold">Loading...</h1>
    </div>
  );
}
