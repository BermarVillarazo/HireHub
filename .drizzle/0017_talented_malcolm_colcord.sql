ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_provider_id_provider_user_id_pk" PRIMARY KEY("provider_id","provider_user_id");--> statement-breakpoint
ALTER TABLE "department" ADD COLUMN "department_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "office" ADD COLUMN "office_id" serial NOT NULL;