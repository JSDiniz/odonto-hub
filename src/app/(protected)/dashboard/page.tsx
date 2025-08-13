import dayjs from "dayjs";
import { and, count, eq, gte, lte, sum } from "drizzle-orm";
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
import { appointments } from "@/db/schema/appointments";
import { doctors } from "@/db/schema/doctors";
import { patients } from "@/db/schema/patients";
import { auth } from "@/lib/auth";

import DatePicker from "./_components/date-picker";
import StatsCards from "./_components/stats-cards";

interface DashboardPrps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const Dashboard = async ({ searchParams }: DashboardPrps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  if (!session?.user.clinic) {
    redirect("/clinic-form");
  }

  const { from, to } = await searchParams;

  if (!from || !to) {
    redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
    );
  }

  const [[totalRevenue], [totalAppointments], [totalPatiets], [totalDoctores]] =
    await Promise.all([
      db
        .select({
          total: sum(appointments.appointmentPriceInCents),
        })
        .from(appointments)
        .where(
          and(
            eq(appointments.clinicId, session.user.clinic.id),
            gte(appointments.date, new Date(from)),
            lte(appointments.date, new Date(to)),
          ),
        ),
      db
        .select({
          total: count(),
        })
        .from(appointments)
        .where(
          and(
            eq(appointments.clinicId, session.user.clinic.id),
            gte(appointments.date, new Date(from)),
            lte(appointments.date, new Date(to)),
          ),
        ),
      db
        .select({
          total: count(),
        })
        .from(patients)
        .where(eq(patients.clinicId, session.user.clinic.id)),
      db
        .select({
          total: count(),
        })
        .from(doctors)
        .where(eq(doctors.clinicId, session.user.clinic.id)),
    ]);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Acesse uma visão geral detalhada das principais métricas e
            resultados dos pacientes
          </PageDescription>
        </PageHeaderContent>

        <PageActions>
          <DatePicker />
        </PageActions>
      </PageHeader>
      <PageContent>
        <StatsCards
          totalRevenue={totalRevenue.total ? Number(totalRevenue.total) : null}
          totalAppointments={totalAppointments?.total ?? 0}
          totalPatiets={totalPatiets?.total ?? 0}
          totalDoctores={totalDoctores?.total ?? 0}
        />
      </PageContent>
    </PageContainer>
  );
};

export default Dashboard;
