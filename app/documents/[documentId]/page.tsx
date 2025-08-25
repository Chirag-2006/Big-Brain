"use client";

import React from "react"; // to use React.use()
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Frown } from "lucide-react";

export default function DocumentPage({
  params,
}: {
  params: Promise<{ documentId: Id<"documents"> }>;
}) {
  // Unwrap the params Promise
  const resolvedParams = React.use(params);

  const document = useQuery(api.documents.getDocument, {
    documentId: resolvedParams.documentId,
  });

  

  if (!document) {
    return (
      <main className="font-sans p-24 space-y-8 sm:p-20">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            Document not found <Frown className="w-40 h-40" />
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="font-sans p-24 space-y-8 sm:p-20">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{document.title}</h1>
      </div>
      <div className="flex gap-12">
        <div className="p-4 bg-gray-900 rounded flex-1 h-[500px]">
          {document.documentUrl && (
            <iframe
              className="w-full h-full no-scrollbar"
              src={document.documentUrl}
            />
          )}
        </div>
        <div className="w-[300px] bg-gray-900"></div>
      </div>
    </main>
  );
}
