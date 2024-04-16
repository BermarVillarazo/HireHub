ALTER TYPE "role" ADD VALUE 'applicant';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applicant" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"first_name" text,
	"last_name" text,
	"resume_url" text,
	"email" text NOT NULL,
	"role" "role" DEFAULT 'applicant' NOT NULL,
	CONSTRAINT "applicant_email_unique" UNIQUE("email")
);
