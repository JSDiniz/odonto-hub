"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointments } from "@/db/schema/appointments";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { upsertAppointmentSchema } from "./schema";

export const upsertAppointment = actionClient
  .schema(upsertAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unautorized");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

    // Combinar data e hora para criar o timestamp
    if (!parsedInput.time) {
      throw new Error("Horário não informado");
    }
    const [hourStr, minuteStr] = parsedInput.time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    const appointmentDateTime = dayjs(parsedInput.date)
      .set("hour", hour)
      .set("minute", minute)
      .toDate();

    await db
      .insert(appointments)
      .values({
        ...parsedInput,
        id: parsedInput?.id,
        clinicId: session?.user.clinic?.id,
        date: appointmentDateTime,
      })
      .onConflictDoUpdate({
        target: [appointments.id],
        set: {
          ...parsedInput,
          date: appointmentDateTime,
        },
      });
    revalidatePath("/appointments");
  });
