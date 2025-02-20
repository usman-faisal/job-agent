import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000),
    LLM_API_KEY: z.string(),
    LLM_MODEL: z.string().optional().default('gemini-1.5-flash'),
  });
  export type Env = z.infer<typeof envSchema>;
  