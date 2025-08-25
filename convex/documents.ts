import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new documents
export const createDocuments = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("User Unauthenticated");
    }

    await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
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
