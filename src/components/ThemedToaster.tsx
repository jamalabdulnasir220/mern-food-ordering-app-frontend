import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const ThemedToaster = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      visibleToasts={1}
      position="top-right"
      richColors
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default ThemedToaster;
