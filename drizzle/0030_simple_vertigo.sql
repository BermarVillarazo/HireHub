ALTER TABLE "department" DROP CONSTRAINT "department_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applicant" ADD CONSTRAINT "applicant_department_id_department_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "department" DROP COLUMN IF EXISTS "user_id";