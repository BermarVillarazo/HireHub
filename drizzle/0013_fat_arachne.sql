CREATE TABLE IF NOT EXISTS "applicant" (
	"id" integer PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text NOT NULL,
	"contact_number" bigint,
	"resume_url" text,
	"communicationType" "communicationType" NOT NULL,
	"positionType" "positionType" NOT NULL,
	CONSTRAINT "applicant_email_unique" UNIQUE("email")
);
