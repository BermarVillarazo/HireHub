ALTER TYPE "statusEnums" ADD VALUE 'Pending';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rating" (
	"rating_id" serial PRIMARY KEY NOT NULL,
	"applicantId" integer,
	"screening" numeric,
	"initial_interview" numeric,
	"teaching_demo" numeric,
	"pyschological_exam" numeric,
	"panel_inter_view" numeric,
	"recommendation_for_hiring" numeric
);
--> statement-breakpoint
ALTER TABLE "applicant" ALTER COLUMN "status" SET DEFAULT 'Pending';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating" ADD CONSTRAINT "rating_applicantId_applicant_id_fk" FOREIGN KEY ("applicantId") REFERENCES "applicant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
