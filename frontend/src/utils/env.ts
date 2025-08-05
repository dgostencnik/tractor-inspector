import { EnvSchema } from "../schemas/env";

function validateEnv(env: unknown) {
  const parsed = EnvSchema.safeParse(env);
  if (!parsed.success) {
    console.error("Invalid environment variables:");
    console.error(parsed.error.format());
    throw new Error("Aborting due to invalid .env configuration");
  }
  return parsed.data;
}

const parsedEnv = validateEnv(import.meta.env);

export default parsedEnv;
