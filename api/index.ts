import express from 'express';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import bodyParser from 'body-parser';
import { NewBudget, budgets } from '../src/db/schema';

dotenv.config();

const app = express();
const port = process.env.PORT;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.send('Welcome to TS Express Node');
});

app.get('/budgets', async (req, res) => {
  const allBudgets = await db.select().from(budgets);
  res.json(allBudgets);
});

app.post('/budget', async (req, res) => {
  const newBudget: NewBudget = req.body;

  const createdBudget = await db.insert(budgets).values(newBudget);
  res.json(createdBudget);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
