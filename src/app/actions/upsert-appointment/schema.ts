import { z } from "zod";

export const upsertAppointmentSchema = z.object({
  id: z.string().uuid().optional(),
  patientId: z.string().uuid(),
  doctorId: z.string().uuid(),
  appointmentPriceInCents: z.number().min(1),
  date: z.date(),
  time: z.string().optional(),
});

export type UpsertAppointmentSchema = z.infer<typeof upsertAppointmentSchema>;
