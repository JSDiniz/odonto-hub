import { relations } from "drizzle-orm";

import { appointments } from "./appointments";
import { availabilities } from "./availabilities";
import { beforeAfterPhotos } from "./before-after-photos";
import { clinics } from "./clinics";
import { landingSections } from "./landing_sections";
import { landingPages } from "./landing-pages";
import { notifications } from "./notifications";
import { patients } from "./patients";
import { payments } from "./payments";
import { services } from "./services";
import { users } from "./users";

// USERS
export const usersRelations = relations(users, ({ many }) => ({
  clinics: many(clinics),
  services: many(services),
  patients: many(patients),
  appointments: many(appointments),
  payments: many(payments),
  notifications: many(notifications),
  availabilities: many(availabilities),
  landingPages: many(landingPages),
  beforeAfterPhotos: many(beforeAfterPhotos),
}));

// CLINICS
export const clinicsRelations = relations(clinics, ({ one, many }) => ({
  user: one(users, {
    fields: [clinics.userId],
    references: [users.id],
  }),
  appointments: many(appointments),
}));

// PATIENTS
export const patientsRelations = relations(patients, ({ one, many }) => ({
  user: one(users, {
    fields: [patients.userId],
    references: [users.id],
  }),
  appointments: many(appointments),
  payments: many(payments),
  notifications: many(notifications),
}));

// SERVICES
export const servicesRelations = relations(services, ({ one, many }) => ({
  user: one(users, {
    fields: [services.userId],
    references: [users.id],
  }),
  appointments: many(appointments),
}));

// APPOINTMENTS
export const appointmentsRelations = relations(appointments, ({ one }) => ({
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
  patient: one(patients, {
    fields: [appointments.patientId],
    references: [patients.id],
  }),
  service: one(services, {
    fields: [appointments.serviceId],
    references: [services.id],
  }),
  clinic: one(clinics, {
    fields: [appointments.clinicId],
    references: [clinics.id],
  }),
  payment: one(payments, {
    fields: [appointments.id],
    references: [payments.appointmentId],
  }),
}));

// PAYMENTS
export const paymentsRelations = relations(payments, ({ one }) => ({
  appointment: one(appointments, {
    fields: [payments.appointmentId],
    references: [appointments.id],
  }),
  patient: one(patients, {
    fields: [payments.patientId],
    references: [patients.id],
  }),
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}));

// NOTIFICATIONS
export const notificationsRelations = relations(notifications, ({ one }) => ({
  appointment: one(appointments, {
    fields: [notifications.appointmentId],
    references: [appointments.id],
  }),
  patient: one(patients, {
    fields: [notifications.patientId],
    references: [patients.id],
  }),
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

// AVAILABILITIES
export const availabilitiesRelations = relations(availabilities, ({ one }) => ({
  user: one(users, {
    fields: [availabilities.userId],
    references: [users.id],
  }),
}));

// LANDING PAGES
export const landingPagesRelations = relations(
  landingPages,
  ({ one, many }) => ({
    user: one(users, {
      fields: [landingPages.userId],
      references: [users.id],
    }),
    landingSections: many(landingSections),
    beforeAfterPhotos: many(beforeAfterPhotos),
  }),
);

// LANDING SECTIONS
export const landingSectionsRelations = relations(
  landingSections,
  ({ one }) => ({
    landingPage: one(landingPages, {
      fields: [landingSections.landingPageId],
      references: [landingPages.id],
    }),
  }),
);

// BEFORE AFTER PHOTOS
export const beforeAfterPhotosRelations = relations(
  beforeAfterPhotos,
  ({ one }) => ({
    user: one(users, {
      fields: [beforeAfterPhotos.userId],
      references: [users.id],
    }),
    landingPage: one(landingPages, {
      fields: [beforeAfterPhotos.landingPageId],
      references: [landingPages.id],
    }),
  }),
);
