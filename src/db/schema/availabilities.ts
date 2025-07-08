import {
  integer,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const availabilities = pgTable("availabilities", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  weekDay: integer("week_day").notNull(), // 0 = domingo, 1 = segunda, ..., 6 = sábado
  fromTime: time("from_time").notNull(), // ex: "08:00"
  toTime: time("to_time").notNull(), // ex: "12:00"
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
