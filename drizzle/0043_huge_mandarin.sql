ALTER TYPE "statusEnums" ADD VALUE 'Screening';--> statement-breakpoint
ALTER TYPE "statusEnums" ADD VALUE 'Initial Interview';--> statement-breakpoint
ALTER TYPE "statusEnums" ADD VALUE 'TeachingDemo';--> statement-breakpoint
ALTER TYPE "statusEnums" ADD VALUE 'Pyschological Exam';--> statement-breakpoint
ALTER TYPE "statusEnums" ADD VALUE 'Panel InterView';--> statement-breakpoint
ALTER TYPE "statusEnums" ADD VALUE 'Recommendation for Hiring';--> statement-breakpoint
ALTER TABLE "applicant" ALTER COLUMN "status" SET DEFAULT 'Screening';