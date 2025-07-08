import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { appointments } from "./appointments";
import { patients } from "./patients";
import { users } from "./users";

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  appointmentId: uuid("appointment_id")
    .references(() => appointments.id)
    .notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  patientId: uuid("patient_id")
    .references(() => patients.id)
    .notNull(),
  type: text("type").notNull(), // ex: 'payment_request', 'confirmation', 'reminder'
  status: text("status").notNull(), // 'sent', 'failed', 'pending'
  sentAt: timestamp("sent_at"),
  responseReceivedAt: timestamp("response_received_at"),
  responseData: text("response_data"), // ex: confirmação do cliente
  createdAt: timestamp("created_at").defaultNow(),
});
