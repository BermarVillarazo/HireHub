ALTER TYPE "role" ADD VALUE 'department_representave';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'office_representave';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'recruitment_staff';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "department_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "office_id" integer;