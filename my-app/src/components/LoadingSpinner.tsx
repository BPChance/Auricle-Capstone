import { Loader2 } from "lucide-react";

type Props = {
  message?: string;
};

export default function LoadingSpinner({ message = "Loading..." }: Props) {
  return (
    <div className="min-h-screen bg-[#2C2C71] text-[#FFC0CB] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin w-8 h-8" />
        <p>{message}</p>
      </div>
    </div>
  );
}