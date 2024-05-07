ALTER TABLE "rating" ADD COLUMN "status_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "applicantid" integer;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "rating" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN IF EXISTS "screening";--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN IF EXISTS "initial_interview";--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN IF EXISTS "teaching_demo";--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN IF EXISTS "pyschological_exam";--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN IF EXISTS "panel_inter_view";--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN IF EXISTS "recommendation_for_hiring";