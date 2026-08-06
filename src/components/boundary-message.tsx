import { Spinner } from "@/components/ui/spinner";

export function BoundaryMessage({
  title,
  showSpinner = false,
}: {
  title: string;
  showSpinner?: boolean;
}) {
  return (
    <div className="flex h-screen items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <h1 className="text-2xl">{title}</h1>
        {showSpinner && <Spinner className="size-14" />}
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
          <img
            src="/atlas.jpg"
            alt="Atlas"
            className="h-auto w-48 max-w-full object-cover sm:w-[300px]"
          />
        </div>
      </div>
    </div>
  );
}
