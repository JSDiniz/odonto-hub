import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle", // pasta onde será gerado o SQL e migrações
  schema: "./src/db/schema/**/*.ts", // pega todos os arquivos .ts dentro da pasta schema (inclusive subpastas)
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
