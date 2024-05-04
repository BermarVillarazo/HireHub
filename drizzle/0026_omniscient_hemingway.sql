ALTER TABLE "department" DROP CONSTRAINT "department_department_type_unique";--> statement-breakpoint
ALTER TABLE "office" DROP CONSTRAINT "office_office_type_unique";--> statement-breakpoint
ALTER TABLE "department" DROP COLUMN IF EXISTS "department_type";--> statement-breakpoint
ALTER TABLE "office" DROP COLUMN IF EXISTS "office_type";