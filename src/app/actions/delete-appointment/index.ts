"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

import { db } from "@/db";
import { appointments } from "@/db/schema/appointments";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

export const deleteAppointment = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const appointment = await db.query.appointments.findFirst({
      where: eq(appointments.id, parsedInput.id),
    });

    if (!appointment) {
      throw new Error("Agendamento não encontrado");
    }

    if (appointment.clinicId !== session?.user?.clinic?.id) {
      throw new Error("Agendamento não encontrado");
    }
    await db.delete(appointments).where(eq(appointments.id, parsedInput.id));

    revalidatePath("/appointments");
  });
