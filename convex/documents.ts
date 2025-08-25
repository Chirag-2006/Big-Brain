import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new documents
export const createDocuments = mutation({
  args: { title: v.string(), fileId: v.id("_storage") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("User Unauthenticated");
    }

    await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
      fileId: args.fileId,
    });
  },
});

// Get documents

export const getDocuments = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

// Get a single document

export const getDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return null;
    }
    const document = await ctx.db.get(args.documentId);

    if (!document) {
      return null;
    }

    if (document.tokenIdentifier !== userId) {
      return null;
    }

    return {...document, documentUrl: await ctx.storage.getUrl(document.fileId)};
  },
});

// update document

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
