import { integer, pgEnum, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["applicant", "user", "super_admin", "hr_head", "vp_acad", "vp_admin"]);

export const communicationEnums = pgEnum("communicationType", ["Email", "PhoneNumber"])

export const positionEnums = pgEnum("positionType", ["teachingStaff", "non-teachingStaff"])


// Todo: Generate migration, update Application table 
export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    avatarUrl: text("avatar_url"),
    email: text("email").unique().notNull(),
    role: roleEnums("role").notNull().default("user"),
});

export const applicant = pgTable("applicant", {
    id: text("id").primaryKey(),
    first_Name: text("first_name"),
    last_Name: text("last_name"),
    email: text("email").unique().notNull(),
    contactNumber: integer('contact_number').notNull(),
    resume: text("resume_url"),
    communication: communicationEnums("communicationType").notNull(),
    position: positionEnums("positionType").notNull(),
    // Department must have a choices that the applicant can select
    // department: text("department").notNull(),
    // role: roleEnums("role").notNull().default("applicant"),
});

export const oauthAccounts = pgTable(
    "oauth_accounts",
    {
        providerId: text("provider_id"),
        providerUserId: text("provider_user_id"),
        userId: text("user_id")
            .notNull()
            .references(() => users.id),
    },
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
