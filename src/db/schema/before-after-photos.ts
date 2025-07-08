import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { landingPages } from "./landing-pages";
import { users } from "./users";

export const beforeAfterPhotos = pgTable("before_after_photos", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  landingPageId: uuid("landing_page_id")
    .references(() => landingPages.id)
    .notNull(),
  title: text("title"),
  description: text("description"),
  beforeImageUrl: text("before_image_url").notNull(),
  afterImageUrl: text("after_image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
