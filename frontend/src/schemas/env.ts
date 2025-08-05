import z from "zod";

export const EnvSchema = z.object({
  VITE_TRACTOR_API_URL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;
