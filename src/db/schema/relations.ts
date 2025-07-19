import { relations } from "drizzle-orm";

import { appointments } from "./appointments";
import { clinics } from "./clinics";
import { doctors } from "./doctors";
import { patients } from "./patients";
import { users } from "./users";
import { usersToClinics } from "./usersToClinics";

// USERS
export const usersRelations = relations(users, ({ many }) => ({
  usersToClinics: many(usersToClinics),
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
  doctors: many(doctors),
  patients: many(patients),
  appointments: many(appointments),
  usersToClinics: many(usersToClinics),
}));

// DOCTORS
export const doctorsRelations = relations(doctors, ({ one }) => ({
  clinics: one(clinics, {
    fields: [doctors.clinicId],
    references: [clinics.id],
  }),
}));

// PATIENTS
export const patientsRelations = relations(patients, ({ many, one }) => ({
  clinics: one(clinics, {
    fields: [patients.clinicId],
    references: [clinics.id],
  }),
  appointments: many(appointments),
}));

// APPOINTMENTS
export const appointmentsRelations = relations(appointments, ({ one }) => ({
  clinic: one(clinics, {
    fields: [appointments.clinicId],
    references: [clinics.id],
  }),
  patient: one(patients, {
    fields: [appointments.patientId],
    references: [patients.id],
  }),
  doctors: one(doctors, {
    fields: [appointments.doctorId],
    references: [doctors.id],
  }),
}));
