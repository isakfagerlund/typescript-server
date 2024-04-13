import { neon } from '@neondatabase/serverless';
import { NewBudget, budgets } from '../src/db/schema';
import { drizzle } from 'drizzle-orm/neon-http';

export const config = {
  runtime: 'edge',
};

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

export async function POST(request: Request) {
  const newBudget: NewBudget = await request.json();
  const createdBudget = await db.insert(budgets).values(newBudget);

  return new Response(JSON.stringify(newBudget), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
