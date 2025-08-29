import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  sex: z.enum(["male", "female"]),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
