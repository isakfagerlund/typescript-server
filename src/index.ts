import express from 'express';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { mySchemaUsers } from './db/schema';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.send('Welcome to TS Express Node');
});

app.get('/users', async (req, res) => {
  const users = await db.select().from(mySchemaUsers);
  res.json(users);
});

app.post('/user', async (req, res) => {
  const newUser: { name: string } = req.body;

  const createdUser = await db.insert(mySchemaUsers).values(newUser);
  res.json(createdUser);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
