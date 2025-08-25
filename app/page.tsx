"use client";

import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";

export default function Home() {
  const createDocuments = useMutation(api.documents.createDocuments);

  const documents = useQuery(api.documents.getDocuments);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Unauthenticated>
        <SignInButton mode="modal" />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <button
          onClick={() => {
            createDocuments({ title: "hello world" });
          }}
        >
          click me
        </button>
      </Authenticated>
      <AuthLoading>
        <p>loading...</p>
      </AuthLoading>
      <p>
        {documents?.map((doc) => (
          <p key={doc._id}>{doc.title}</p>
        ))}
      </p>
    </div>
  );
}
