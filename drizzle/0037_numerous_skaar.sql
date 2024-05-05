ALTER TABLE "users" ADD COLUMN "department_name" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "office_name" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_office_id_office_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "office"("office_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
