import { ToggleTheme } from "@/components/ui/toggle-theme";
import Image from "next/image";
import { HeaderAction } from "./Header-actions";

export function Header() {
  return (
    <>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex gap-4 items-center text-2xl text-white">
            <Image
              src="/logo.png"
              alt="an image of a brain"
              width={40}
              height={40}
              className="rounded-md"
            />
            BIGBRAIN
          </div>
          <div className="flex gap-4 items-center">
            <ToggleTheme />
            <HeaderAction />
          </div>
        </div>
      </div>
    </>
  );
}
