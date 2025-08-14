import dayjs from "dayjs";
import { and, count, desc, eq, gte, lte, sql, sum } from "drizzle-orm";
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
import { AppointmentsChart } from "./_components/appointments-chart";
import { TopDoctores } from "./_components/top-doctors";
import { TopSpecialties } from "./_components/top-specialties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { appointmentsColumns } from "../appointments/_components/table-columns";
import { getDashboard } from "@/data/get-dashboard";

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

  const {
    totalRevenue,
    totalAppointments,
    totalPatiets,
    totalDoctores,
    topDoctores,
    topSpecialties,
    todayAppointments,
    dailyAppointmentsDate
  } = await getDashboard({
    from,
    to,
    session: {
      user: {
        clinic: {
          id: session.user.clinic.id
        }
      }
    }
  })

  const appointmentsWithArrayDoctors = todayAppointments.map((appt) => ({
    ...appt,
    doctors: appt.doctors ? [appt.doctors] : [],
  }));

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

        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <AppointmentsChart dailyAppointmentsDate={dailyAppointmentsDate} />
          <TopDoctores doctors={topDoctores} />
        </div>

        <div className="grid grid-cols-[2.25fr_1fr] gap-4">

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground" />
                <CardTitle className="test-base">
                  Agendamentos de hoje
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <DataTable columns={appointmentsColumns} data={appointmentsWithArrayDoctors} />
            </CardContent>
          </Card>

          <TopSpecialties topSpecialties={topSpecialties} />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default Dashboard;
