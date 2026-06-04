import { Loader2 } from "lucide-react";

type PageLoaderProps = {
  label?: string;
};

const PageLoader = ({ label = "Loading..." }: PageLoaderProps) => {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="mb-3 h-10 w-10 animate-spin text-brand sm:h-12 sm:w-12" />
      <span className="text-base font-semibold text-muted-foreground sm:text-lg">
        {label}
      </span>
    </div>
  );
};

export default PageLoader;
