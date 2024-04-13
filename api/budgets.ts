import { neon } from '@neondatabase/serverless';
import { budgets } from '../src/db/schema';
import { drizzle } from 'drizzle-orm/neon-http';

export const config = {
  runtime: 'edge',
};

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

export async function GET() {
  const allBudgets = await db.select().from(budgets);

  return new Response(JSON.stringify(allBudgets), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
