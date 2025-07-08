import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { appointments } from "./appointments";
import { patients } from "./patients";
import { users } from "./users";

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),

  appointmentId: uuid("appointment_id")
    .references(() => appointments.id)
    .notNull(),
  patientId: uuid("patient_id")
    .references(() => patients.id)
    .notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),

  amount: numeric("amount").notNull(), // valor da consulta
  paymentMethod: text("payment_method").notNull(), // ex: 'pix', 'credit_card'
  status: text("status").notNull(), // 'pending', 'paid', 'failed', 'refunded'
  transactionId: text("transaction_id"), // id do gateway (se houver)
  paidAt: timestamp("paid_at"), // data do pagamento (se pago)

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
