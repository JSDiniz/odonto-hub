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

import { SubscriptionPlan } from "./_components/subscription-plan";

const Subscription = async () => {
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

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Assinatura</PageTitle>
          <PageDescription>Gerencie sua assinatura.</PageDescription>
        </PageHeaderContent>

        <PageActions>
          <></>
        </PageActions>
      </PageHeader>
      <PageContent>
        <SubscriptionPlan />
      </PageContent>
    </PageContainer>
  );
};

export default Subscription;
