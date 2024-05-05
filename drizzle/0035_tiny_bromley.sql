ALTER TABLE "applicant" ADD COLUMN "department_name" text;--> statement-breakpoint
ALTER TABLE "applicant" ADD COLUMN "office_name" text;--> statement-breakpoint
ALTER TABLE "applicant" DROP COLUMN IF EXISTS "application_name";