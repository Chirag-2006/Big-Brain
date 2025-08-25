import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

export default function LoadingButton({
  isloading,
  children,
  loadingText,
}: {
  isloading: boolean;
  children: ReactNode;
  loadingText: string;
}) {
  return (
    <Button
      type="submit"
      disabled={isloading}
      className="flex gap-1 items-center"
    >
      {isloading && <Loader2 className=" animate-spin" />}
      {isloading ? loadingText : children}
    </Button>
  );
}
