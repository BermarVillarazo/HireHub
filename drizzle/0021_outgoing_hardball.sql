DO $$ BEGIN
 CREATE TYPE "departmentEnums" AS ENUM('CSS', 'CE', 'SHS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'recruiter';