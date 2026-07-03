import { Spinner } from "@/components/ui/spinner";

export default function SpinnerSize() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl">Loading</h1>
        <Spinner className="size-14" />
      </div>
    </div>
  );
}
