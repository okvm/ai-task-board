import { defineSchema, defineTable } from "convex/schema";

export default defineSchema({
  tasks: defineTable({
    title: "string",
    description: "string",
    status: "string", // "todo", "inprogress", "done"
    assignee: "string", // "me" or "you"
    priority: "string", // "low", "medium", "high"
    createdAt: "number",
    updatedAt: "number",
    dueDate: "number",
  }),
});