import {
  boolean,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { landingPages } from "./landing-pages";

export const landingSections = pgTable("landing_sections", {
  id: uuid("id").primaryKey().defaultRandom(),
  landingPageId: uuid("landing_page_id")
    .references(() => landingPages.id)
    .notNull(),

  type: text("type").notNull(), // 'about', 'services', etc.
  order: integer("order").notNull(),
  isVisible: boolean("is_visible").default(true),

  // Novo: título grande da seção
  sectionTitle: text("section_title"), // Ex: "Sobre"

  // Novo: subtítulo ou chamada centralizada
  sectionSubtitle: text("section_subtitle"), // Ex: "Como dentista a três anos..."

  // Novo: título do bloco de conteúdo
  contentTitle: text("content_title"), // Ex: "Excelência em Odontologia"

  // Parágrafos formatados como JSON
  content: json("content"), // Ex: ["Parágrafo 1", "Parágrafo 2", "Parágrafo 3"]

  // Imagem e posição
  imageUrl: text("image_url"),
  imagePosition: text("image_position"), // 'left' ou 'right'

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
