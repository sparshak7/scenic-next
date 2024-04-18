import { Loader2 } from "lucide-react";

export default function AdminLoader() {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="size-12 animate-spin text-primary"/>
    </div>
  )
}