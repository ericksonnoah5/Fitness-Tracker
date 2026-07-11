"use client";

export default function Error() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl">Something went wrong</h1>
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
          <img
            src="/raspberrypi/atlas/atlas.jpg"
            alt="Atlas"
            className="h-auto w-[300] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
