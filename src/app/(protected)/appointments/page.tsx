import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
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
import { appointments } from "@/db/schema/appointments";
import { doctors } from "@/db/schema/doctors";
import { patients } from "@/db/schema/patients";
import { auth } from "@/lib/auth";

import AddAppointmentButton from "./_components/add-appointment-button";
import {
  appointmentsColumns,
  AppointmentWithRelations,
} from "./_components/table-columns";

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

  // Buscar agendamentos com joins para paciente e dentista
  const userAppointments = await db.query.appointments.findMany({
    where: eq(appointments.clinicId, session?.user?.clinic.id),
    with: {
      doctors: true,
      patient: true,
    },
  });

  // Ajustar para compatibilizar com o tipo esperado nas colunas
  const appointmentsWithRelations: AppointmentWithRelations[] =
    userAppointments.map((appt) => ({
      ...appt,
      doctors: Array.isArray(appt.doctors) ? appt.doctors : [appt.doctors],
      patient: appt.patient,
    }));

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
        <DataTable
          data={appointmentsWithRelations}
          columns={appointmentsColumns}
        />
      </PageContent>
    </PageContainer>
  );
};

export default Appointments;
