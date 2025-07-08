import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const landingPages = pgTable("landing_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),

  // Landing info
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  template: text("template").default("default"),
  isActive: boolean("is_active").default(true),

  // Header info
  logoUrl: text("logo_url"),
  headerTitle: text("header_title"), // Ex: "Clínica Sorriso"
  navLinks: json("nav_links"), // [{ label: 'Serviços', href: '#services' }]

  // Footer info
  footerText: text("footer_text"), // "Todos os direitos reservados"
  footerLinks: json("footer_links"), // [{ label: 'Política', href: '/politica' }]
  socialLinks: json("social_links"), // [{ icon: 'whatsapp', url: '...' }]

  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
