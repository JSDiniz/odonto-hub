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
import { patients } from "@/db/schema/patients";
import { auth } from "@/lib/auth";

import AddPatientButton from "./_components/add-patient-button";
// import PatientCard from "./_components/patient-card";
import { patientsColumns } from "./_components/table-columns";

const Patients = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user.clinic) {
    redirect("/clinic-form");
  }

  if (!session?.user.plan) {
    redirect("/new-subscription");
  }

  const userPatients = await db.query.patients.findMany({
    where: eq(patients.clinicId, session?.user?.clinic.id),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os Pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>

        <PageActions>
          <AddPatientButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <DataTable data={userPatients} columns={patientsColumns} />
      </PageContent>
    </PageContainer>
  );
};

export default Patients;
