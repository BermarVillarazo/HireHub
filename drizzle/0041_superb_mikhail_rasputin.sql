CREATE TABLE IF NOT EXISTS "jobRequest" (
	"request_request" serial PRIMARY KEY NOT NULL,
	"requested_position" text NOT NULL,
	"request_type" text NOT NULL,
	"request_description" text NOT NULL,
	"request_qualification" text NOT NULL,
	"request_date" timestamp DEFAULT now(),
	"department_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobRequest" ADD CONSTRAINT "jobRequest_department_id_department_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
