import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { doctors } from "@/db/schema/doctors";
import { patients } from "@/db/schema/patients";
import { auth } from "@/lib/auth";

import AddAppointmentButton from "./_components/add-appointment-button";

const Appointments = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user.clinic) {
    redirect("/clinic-form");
  }

  const userPatients = await db.query.patients.findMany({
    where: eq(patients.clinicId, session?.user?.clinic.id),
  });

  const userDoctors = await db.query.doctors.findMany({
    where: eq(doctors.clinicId, session?.user?.clinic.id),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Agendamentos</PageTitle>
          <PageDescription>
            Gerencie os agendamentos da sua clínica
          </PageDescription>
        </PageHeaderContent>

        <PageActions>
          <AddAppointmentButton patients={userPatients} doctors={userDoctors} />
        </PageActions>
      </PageHeader>
      <PageContent>
        {/* Listagem de agendamentos será implementada futuramente */}
        <p>Listagem de agendamentos será implementada futuramente</p>
      </PageContent>
    </PageContainer>
  );
};

export default Appointments;
