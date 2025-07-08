import {
  date,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { patients } from "./patients";
import { services } from "./services";
import { users } from "./users";

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  patientId: uuid("patient_id")
    .references(() => patients.id)
    .notNull(),
  serviceId: uuid("service_id")
    .references(() => services.id)
    .notNull(),
  clinicId: uuid("clinic_id")
    .references(() => clinics.id)
    .notNull(),

  date: date("date").notNull(), // 📅 Data do agendamento
  startTime: time("start_time").notNull(), // 🕒 Hora escolhida

  status: text("status").default("scheduled"),
  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
