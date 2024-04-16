CREATE TABLE IF NOT EXISTS "applicant" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text NOT NULL,
	"contact_number" integer NOT NULL,
	"resume_url" text,
	"communicationType" "communicationType" NOT NULL,
	"positionType" "positionType" NOT NULL,
	"role" "role" DEFAULT 'applicant' NOT NULL,
	CONSTRAINT "applicant_email_unique" UNIQUE("email")
);
