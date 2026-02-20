import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// 获取所有任务
export const getTasks = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

// 创建新任务
export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    assignee: v.string(),
    priority: v.string(),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.insert("tasks", {
      ...args,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    });
  },
});

// 更新任务
export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.string()),
    assignee: v.optional(v.string()),
    priority: v.optional(v.string()),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// 删除任务
export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// 按状态获取任务
export const getTasksByStatus = query({
  args: {
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("status"), args.status))
      .collect();
  },
});

// 按分配者获取任务
export const getTasksByAssignee = query({
  args: {
    assignee: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("assignee"), args.assignee))
      .collect();
  },
});