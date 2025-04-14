import { z } from 'zod';


const insertScoreDto = z.object({
  playerId: z.string(),
  score: z.number(),
});
export const submitScoreSchema = z.object({
  body: insertScoreDto,
});


export type InsertScoreDto = z.infer<typeof insertScoreDto>;