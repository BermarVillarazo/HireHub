CREATE TABLE IF NOT EXISTS "department" (
	"department_name" text NOT NULL,
	"department_type" text NOT NULL,
	"department_code" text NOT NULL,
	CONSTRAINT "department_department_name_unique" UNIQUE("department_name"),
	CONSTRAINT "department_department_type_unique" UNIQUE("department_type"),
	CONSTRAINT "department_department_code_unique" UNIQUE("department_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "office" (
	"office_name" text NOT NULL,
	"office_type" text NOT NULL,
	"office_code" text NOT NULL,
	CONSTRAINT "office_office_name_unique" UNIQUE("office_name"),
	CONSTRAINT "office_office_type_unique" UNIQUE("office_type"),
	CONSTRAINT "office_office_code_unique" UNIQUE("office_code")
);
--> statement-breakpoint
DROP TABLE "Department";--> statement-breakpoint
ALTER TABLE "oauth_accounts" DROP CONSTRAINT "oauth_accounts_provider_id_provider_user_id_pk";