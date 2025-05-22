import * as dotenv from 'dotenv';
// import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env.local');
}

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle', // create an empty folder called drizzle for the migration files
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  migrations: {
    table: '__drizzle_migrations',
    schema: 'public'
  },
  verbose: true,
  strict: true
});
