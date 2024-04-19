ALTER TABLE "oauth_accounts" DROP CONSTRAINT "oauth_accounts_provider_id_provider_user_id_pk";--> statement-breakpoint
ALTER TABLE "applicant" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "applicant" DROP COLUMN IF EXISTS "role";