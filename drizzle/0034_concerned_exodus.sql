ALTER TABLE "applicant" DROP CONSTRAINT "applicant_office_id_department_department_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applicant" ADD CONSTRAINT "applicant_office_id_office_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "office"("office_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
