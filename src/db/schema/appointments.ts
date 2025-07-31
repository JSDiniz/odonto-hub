import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { doctors } from "./doctors";
import { patients } from "./patients";

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: timestamp("date").notNull(),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),

  clinicId: uuid("clinic_id")
    .references(() => clinics.id, { onDelete: "cascade" })
    .notNull(),
  patientId: uuid("patient_id")
    .references(() => patients.id, { onDelete: "cascade" })
    .notNull(),
  doctorId: uuid("doctor_id")
    .references(() => doctors.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
