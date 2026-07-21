import { z } from "zod";

export const submitQuizSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.number(),
      answer: z.enum(["A", "B", "C", "D"]),
    })
  ),
});