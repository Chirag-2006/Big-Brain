"use client";

import { api } from "@/convex/_generated/api";
import {  useQuery } from "convex/react";
import DocumentCard from "./document-card";
import CreateDocumentButton from "./upload-document-button";

export default function Home() {

  const documents = useQuery(api.documents.getDocuments);
  return (
    <main className="font-sans p-24 space-y-8 sm:p-20">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
        {documents?.map((doc) => (
          <DocumentCard key={doc._id} document={doc} />
        ))}
      </div>
    </main>
  );
}
