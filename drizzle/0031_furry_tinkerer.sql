DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_department_id_department_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
