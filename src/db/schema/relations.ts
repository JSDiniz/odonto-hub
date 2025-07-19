import { relations } from "drizzle-orm";

import { appointments } from "./appointments";

import { clinics } from "./clinics";

import { patients } from "./patients";

import { services } from "./services";
import { users } from "./users";
import { usersToClinics } from "./usersToClinics";

// USERS
export const usersRelations = relations(users, ({ many }) => ({
  usersToClinics: many(usersToClinics),
  services: many(services),
  patients: many(patients),
  appointments: many(appointments),

}));

// USERS_TO_CLINICS
export const usersToClinicsRelations = relations(usersToClinics, ({ one }) => ({
  user: one(users, {
    fields: [usersToClinics.userId],
    references: [users.id],
  }),
  clinic: one(clinics, {
    fields: [usersToClinics.clinicId],
    references: [clinics.id],
  }),
}));

// CLINICS
export const clinicsRelations = relations(clinics, ({ many }) => ({
  usersToClinics: many(usersToClinics),
  appointments: many(appointments),
}));

// PATIENTS
export const patientsRelations = relations(patients, ({ one, many }) => ({
  user: one(users, {
    fields: [patients.userId],
    references: [users.id],
  }),
  appointments: many(appointments),

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

}));
