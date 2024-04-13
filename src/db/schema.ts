import {
  serial,
  text,
  pgSchema,
  integer,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core';

type CostsObject = {
  [key: string]: string;
};

export type Budget = typeof budgets.$inferSelect;
export type NewBudget = typeof budgets.$inferInsert;

export const budgetSchema = pgSchema('budget_schema');

export const budgets = budgetSchema.table('budgets', {
  id: serial('id').primaryKey(),
  budgetUser: text('budget_user'),
  monthlyBrutto: integer('monthly_brutto'),
  taxPercentage: integer('tax_percentage').default(45).notNull(),
  investmentPercentage: integer('investment_percentage'),
  costs: jsonb('costs').$type<CostsObject[]>(),
  email: text('email'),
  isActive: boolean('is_active').default(true),
});
