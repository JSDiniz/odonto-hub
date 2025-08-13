"use client";

import { CalendarDays, DollarSign, Stethoscope, Users } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyInCents } from "@/helpers/currency";

type StatsCardsProps = {
  totalRevenue: number | bigint | null | undefined;
  totalAppointments: number | bigint | null | undefined;
  totalPatiets: number | bigint | null | undefined;
  totalDoctores: number | bigint | null | undefined;
};

const StatsCards = ({
  totalRevenue,
  totalAppointments,
  totalPatiets,
  totalDoctores,
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="gap-2">
          <div className="text-primary flex items-center gap-2">
            <span className="bg-primary/10 text-primary inline-flex items-center justify-center rounded-full p-1">
              <DollarSign className="h-4 w-4" />
            </span>
            <span className="text-muted-foreground text-sm">Faturamento</span>
          </div>
          <CardTitle className="text-2xl font-semibold">
            {formatCurrencyInCents(Number(totalRevenue ?? 0))}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <div className="text-primary flex items-center gap-2">
            <span className="bg-primary/10 text-primary inline-flex items-center justify-center rounded-full p-1">
              <CalendarDays className="h-4 w-4" />
            </span>
            <span className="text-muted-foreground text-sm">Agendamentos</span>
          </div>
          <CardTitle className="text-2xl font-semibold">
            {Number(totalAppointments ?? 0)}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <div className="text-primary flex items-center gap-2">
            <span className="bg-primary/10 text-primary inline-flex items-center justify-center rounded-full p-1">
              <Users className="h-4 w-4" />
            </span>
            <span className="text-muted-foreground text-sm">Pacientes</span>
          </div>
          <CardTitle className="text-2xl font-semibold">
            {Number(totalPatiets ?? 0)}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <div className="text-primary flex items-center gap-2">
            <span className="bg-primary/10 text-primary inline-flex items-center justify-center rounded-full p-1">
              <Stethoscope className="h-4 w-4" />
            </span>
            <span className="text-muted-foreground text-sm">Médicos</span>
          </div>
          <CardTitle className="text-2xl font-semibold">
            {Number(totalDoctores ?? 0)}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default StatsCards;
