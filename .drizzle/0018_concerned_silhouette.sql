ALTER TABLE "oauth_accounts" DROP CONSTRAINT "oauth_accounts_provider_id_provider_user_id_pk";--> statement-breakpoint
ALTER TABLE "applicant" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "department" DROP COLUMN IF EXISTS "department_id";--> statement-breakpoint
ALTER TABLE "office" DROP COLUMN IF EXISTS "office_id";