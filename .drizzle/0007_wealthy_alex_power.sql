DO $$ BEGIN
 CREATE TYPE "communicationType" AS ENUM('Email', 'PhoneNumber');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "positionType" AS ENUM('teachingStaff', 'non-teachingStaff');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "applicant" ADD COLUMN "contact_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "applicant" ADD COLUMN "communicationType" "communicationType" NOT NULL;--> statement-breakpoint
ALTER TABLE "applicant" ADD COLUMN "positionType" "positionType" NOT NULL;--> statement-breakpoint
ALTER TABLE "applicant" DROP COLUMN IF EXISTS "name";