"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinics } from "@/db/schema/clinics";
import { usersToClinics } from "@/db/schema/usersToClinics";
import { auth } from "@/lib/auth";

export const createClinic = async (
  name: string,
  email: string,
  address: string,
) => {
  //
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const [clinic] = await db
    .insert(clinics)
    .values({ name, email, address })
    .returning();

  await db.insert(usersToClinics).values({
    clinicId: clinic.id,
    userId: session.user.id,
  });
  redirect("/dashboard");
};
