ALTER TABLE "jobRequest" ADD COLUMN "department_name" text DEFAULT 'empty';--> statement-breakpoint
ALTER TABLE "jobRequest" ADD COLUMN "office_name" text DEFAULT 'empty';--> statement-breakpoint
ALTER TABLE "jobRequest" ADD COLUMN "office_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobRequest" ADD CONSTRAINT "jobRequest_office_id_office_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "office"("office_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
