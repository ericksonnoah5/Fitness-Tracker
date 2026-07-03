import { Folder, MoveUpRight } from "lucide-react";

export default function Page() {
  return (
    <div className="flex items-center gap-2">
      <Folder size={20} />

      <MoveUpRight></MoveUpRight>
      <span>Documents</span>
    </div>
  );
}
