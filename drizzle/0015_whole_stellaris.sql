CREATE TABLE IF NOT EXISTS "Department" (
	"DepartmentID" serial PRIMARY KEY NOT NULL,
	"department_name" text NOT NULL,
	"department_type" text NOT NULL,
	CONSTRAINT "Department_department_name_unique" UNIQUE("department_name"),
	CONSTRAINT "Department_department_type_unique" UNIQUE("department_type")
);
--> statement-breakpoint
ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_provider_id_provider_user_id_pk" PRIMARY KEY("provider_id","provider_user_id");