import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { clinics } from "./clinics";

// enun
export const patintSexEnun = pgEnum("patient_sex", ["male", "female"]);

export const patients = pgTable("patients", {
  id: uuid("id").primaryKey().defaultRandom(),

  clinicId: uuid("clinic_id")
    .references(() => clinics.id, { onDelete: "cascade" })
    .notNull(),

  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  sex: patintSexEnun("sex").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
