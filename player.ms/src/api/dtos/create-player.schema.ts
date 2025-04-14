import { z } from 'zod';


const createPlayerDto = z.object({
  username: z.string(),
  email: z.string().email('Invalid email format'),
  age: z.number().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
});

export const createPlayerSchema = z.object({
  body: createPlayerDto.strict(),
});

const updatePlayerDto = z.object({
  username: z.string(),
})
export const updatePlayerSchema = z.object({
  body: updatePlayerDto.strict()
});

export type CreatePlayerDto = z.infer<typeof createPlayerDto>;
export type UpdatePlayerDto = z.infer<typeof updatePlayerDto>;