"use client";

import { ToggleTheme } from "@/components/ui/toggle-theme";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import Image from "next/image";

export function Header() {
  return (
    <>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex gap-2 items-center text-2xl">
            <Image
              src="/logo.png"
              alt="an image of a brain"
              width={32}
              height={32}
              className="rounded-md"
            />
            BIGBRAIN
          </div>
          <div className="flex gap-4 items-center">
            <Unauthenticated>
              <SignInButton mode="modal" />
            </Unauthenticated>
            <Authenticated>
              <ToggleTheme />
              <UserButton />
            </Authenticated>
            <AuthLoading>
              <p>loading...</p>
            </AuthLoading>
          </div>
        </div>
      </div>
    </>
  );
}
