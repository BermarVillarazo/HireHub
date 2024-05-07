ALTER TABLE "rating" DROP CONSTRAINT "rating_applicantId_applicant_id_fk";
--> statement-breakpoint
ALTER TABLE "applicant" ADD COLUMN "rating_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applicant" ADD CONSTRAINT "applicant_rating_id_rating_rating_id_fk" FOREIGN KEY ("rating_id") REFERENCES "rating"("rating_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN IF EXISTS "applicantId";