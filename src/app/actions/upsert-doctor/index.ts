"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { doctors } from "@/db/schema/doctors";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { upsertDoctorSchema } from "./schema";

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
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

    await db
      .insert(doctors)
      .values({
        id: parsedInput.id,
        ...parsedInput,
        clinicId: session?.user.clinic?.id,
      })
      .onConflictDoUpdate({
        target: [doctors.id],
        set: {
          ...parsedInput,
        },
      });
  });
