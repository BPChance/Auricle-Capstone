import Link from "next/link";

type Props = {
  message?: string;
  linkHref?: string;
  linkText?: string;
};

export default function ErrorMessage({ 
  message = "Error loading data", 
  linkHref = "/train",
  linkText = "Back to training"
}: Props) {
  return (
    <div className="min-h-screen bg-[#2C2C71] text-[#FFC0CB] flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-400">{message}</p>
        <Link href={linkHref} className="mt-4 underline">
          {linkText}
        </Link>
      </div>
    </div>
  );
}