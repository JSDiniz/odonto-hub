"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { appointments } from "@/db/schema/appointments";
import { doctors } from "@/db/schema/doctors";
import { patients } from "@/db/schema/patients";

import AppointmentTableActions from "./table-actions";

export type AppointmentWithRelations = typeof appointments.$inferSelect & {
  doctors: Pick<typeof doctors.$inferSelect, "id" | "name">[];
  patient: Pick<typeof patients.$inferSelect, "id" | "name">;
};

export const appointmentsColumns: ColumnDef<AppointmentWithRelations>[] = [
  {
    id: "patient",
    accessorKey: "patient.name",
    header: "Paciente",
    cell: (params) => params.row.original.patient?.name || "-",
  },
  {
    id: "doctor",
    accessorKey: "doctors",
    header: "Dentista",
    cell: (params) => {
      const doctorsArr = params.row.original.doctors;
      return doctorsArr && doctorsArr.length > 0 ? doctorsArr[0].name : "-";
    },
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Data e Hora",
    cell: (params) => {
      const appointments = params.row.original;
      return format(new Date(appointments.date), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      });
    },
  },
  // {
  //   id: "specialty",
  //   accessorKey: "doctors.specialty",
  //   header: "Especialidade",
  // },
  {
    id: "price",
    accessorKey: "appointmentPriceInCents",
    header: "Valor",
    cell: (params) => {
      const cents = params.getValue() as number;
      return (cents / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const appointment = params.row.original;
      return <AppointmentTableActions appointment={appointment} />;
    },
  },
];
