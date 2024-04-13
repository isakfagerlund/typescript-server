CREATE TABLE IF NOT EXISTS "budget_schema"."budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"monthly_brutto" integer,
	"tax_percentage" integer,
	"investment_percentage" integer,
	"costs" jsonb
);
