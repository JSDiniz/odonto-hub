import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinics } from "@/db/schema/usersToClinics";
import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  // Preciso pegar as clínicas do usuário
  const clinics = await db.query.usersToClinics.findMany({
    where: eq(usersToClinics.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        {session?.user.name} <br />
        {session?.user.email}
      </p>

      <SignOutButton />
    </div>
  );
};

export default Dashboard;
