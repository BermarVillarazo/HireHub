import { relations } from "drizzle-orm";
import { bigint, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", [
    "applicant",
    "user",
    "recruitment_staff",
    "representative",
]);

export const communicationEnums = pgEnum("communicationType", ["Email", "PhoneNumber"]);
export const positionEnums = pgEnum("positionType", ["teachingStaff", "non-teachingStaff"]);
export const statusEnums = pgEnum("statusEnums", [
    "Screening",
    "Initial Interview",
    "TeachingDemo",
    "Pyschological Exam",
    "Panel InterView",
    "Recommendation for Hiring",
]);

// Todo: Generate migration, update Application table
export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    avatarUrl: text("avatar_url"),
    email: text("email").unique().notNull(),
    role: roleEnums("role").notNull().default("user"),
    departmentId: integer("department_id").references(() => department.department_id),
    departmentName: text("department_name"),
    officeId: integer("office_id").references(() => office.office_id),
    officeName: text("office_name"),
    appliedAt: timestamp("applied_at").defaultNow(),
});

export const applicant = pgTable("applicant", {
    id: serial("id").primaryKey(),
    first_Name: text("first_name"),
    last_Name: text("last_name"),
    email: text("email").unique().notNull(),
    contactNumber: bigint("contact_number", { mode: "number" }),
    resume: text("resume_url"),
    applicationLetter: text("application_letter"),
    communication: communicationEnums("communicationType").notNull(),
    position: positionEnums("positionType").notNull(),
    role: roleEnums("role").notNull().default("applicant"),
    departmentId: integer("department_id").references(() => department.department_id),
    officeId: integer("office_id").references(() => office.office_id),
    departmentName: text("department_name").default("empty"),
    officeName: text("office_name").default("empty"),
    status: statusEnums("status").default("Screening"),
});

export const department = pgTable("department", {
    department_id: serial("department_id").primaryKey(),
    department_name: text("department_name").unique().notNull(),
    department_code: text("department_code").unique().notNull(),
});

export const office = pgTable("office", {
    office_id: serial("office_id").primaryKey(),
    office_name: text("office_name").unique().notNull(),
    office_code: text("office_code").unique().notNull(),
});

export const jobRequest = pgTable("jobRequest", {
    request_id: serial("request_request").primaryKey(),
    requested_position: text("requested_position").notNull(),
    request_type: text("request_type").notNull(),
    request_description: text("request_description").notNull(),
    request_qualification: text("request_qualification").notNull(),
    departmentName: text("department_name").default("empty"),
    officeName: text("office_name").default("empty"),
    request_date: timestamp("request_date").defaultNow(),
    departmentId: integer("department_id").references(() => department.department_id),
    officeId: integer("office_id").references(() => office.office_id),
});

export const rating = pgTable("rating", {
    rating_id: serial("rating_id").primaryKey(),
    status_name: text("status_name").notNull(),
    applicantId: integer("applicantid").references(() => applicant.id),
    rating: integer("rating").notNull(),
});

export const departmenttRelation = relations(department, ({ many, one }) => ({
    applicant: many(applicant),
    user: one(users),
}));

export const Rating = relations(rating, ({ one }) => ({
    applicant: one(applicant, {
        fields: [rating.applicantId],
        references: [applicant.id],
    }),
}));

export const officeRelation = relations(office, ({ many, one }) => ({
    applicant: many(applicant),
    user: one(users),
}));

export const requestRelation = relations(jobRequest, ({ one }) => ({
    department: one(department, {
        fields: [jobRequest.departmentId],
        references: [department.department_id],
    }),
    office: one(office, {
        fields: [jobRequest.officeId],
        references: [office.office_id],
    }),
}));

export const applicantRelation = relations(applicant, ({ one }) => ({
    department: one(department, {
        fields: [applicant.departmentId],
        references: [department.department_id],
    }),
    office: one(office, {
        fields: [applicant.officeId],
        references: [office.office_id],
    }),
}));

export const userRelation = relations(users, ({ one }) => ({
    department: one(department, {
        fields: [users.departmentId],
        references: [department.department_id],
    }),
    office: one(office, {
        fields: [users.officeId],
        references: [office.office_id],
    }),
}));

// export const departmentRelation = relations(department, ({ }) => ({
//   user:
// }))

// export const Office = pgTable("Office", {
//     office_id: serial("OfficeID").primaryKey(),
//     office_name: text("office_name").unique().notNull(),

// })

// Department must have a choices that the applicant can select
// department: text("department").notNull(),
//role: roleEnums("role").notNull().default("applicant"),

export const oauthAccounts = pgTable(
    "oauth_accounts",
    {
        providerId: text("provider_id"),
        providerUserId: text("provider_user_id"),
        userId: text("user_id")
            .notNull()
            .references(() => users.id),
    }
    // (table) => ({ pk: primaryKey({ columns: [table.providerId, table.providerUserId] }) })
);

export const sessions = pgTable("sessions", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
});

export type User = typeof users.$inferSelect;
export type ApplicantSelect = typeof applicant.$inferSelect;
export type ApplicantInsert = typeof applicant.$inferInsert;
export type DepartmentSelect = typeof department.$inferSelect;
export type DepartmentInsert = typeof department.$inferSelect;
export type OfficeSelect = typeof office.$inferSelect;
export type OfficeInsert = typeof office.$inferInsert;
export type JobRequestSelect = typeof jobRequest.$inferSelect;
export type JobRequestInsert = typeof jobRequest.$inferInsert;
export type UserRole = typeof roleEnums.enumValues;
export type communicationEnums = typeof communicationEnums.enumValues;
export type StatusEnums = typeof statusEnums.enumValues;
export type rating = typeof rating.$inferSelect;
