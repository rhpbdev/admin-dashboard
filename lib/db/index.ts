// index.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

import { products } from './schema';
import * as dotenv from 'dotenv';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  const product: typeof products.$inferInsert = {
    imageUrl: 'https://example.com/img.jpg',
    name: 'Trifold',
    status: 'active',
    price: '24.99',
    stock: 25,
    isCustomizable: true
  };

  await db.insert(products).values(product);
  console.log('✅ Product inserted');
}

main().catch((err) => {
  console.error('❌ Error inserting product:', err);
});
