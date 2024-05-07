ALTER TABLE "applicant" DROP CONSTRAINT "applicant_rating_id_rating_rating_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating" ADD CONSTRAINT "rating_applicantid_applicant_id_fk" FOREIGN KEY ("applicantid") REFERENCES "applicant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "applicant" DROP COLUMN IF EXISTS "rating_id";