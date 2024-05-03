DO $$ BEGIN
 CREATE TYPE "statusEnums" AS ENUM('pending', 'approved', 'declined');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "departmentEnums" ADD VALUE 'CCS';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'ccs';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'ce';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'shs';--> statement-breakpoint
ALTER TABLE "oauth_accounts" DROP CONSTRAINT "oauth_accounts_provider_id_provider_user_id_pk";--> statement-breakpoint
ALTER TABLE "applicant" ADD COLUMN "department_id" integer;--> statement-breakpoint
ALTER TABLE "applicant" ADD COLUMN "office_id" integer;--> statement-breakpoint
ALTER TABLE "applicant" ADD COLUMN "status" "statusEnums" DEFAULT 'pending' NOT NULL;