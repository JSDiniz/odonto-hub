import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { users } from "./users";

export const usersToClinics = pgTable("users_to_clinics", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinics.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
