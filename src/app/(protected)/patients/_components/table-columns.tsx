"use client";

import { ColumnDef } from "@tanstack/react-table";

import { patients } from "@/db/schema/patients";

import PatientsTableActions from "./table-actions";

type Patient = typeof patients.$inferSelect;

export const patientsColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Número de celular",
    cell: (params) => {
      const phoneNumber = params.getValue() as string;
      // Remove any non-digit characters
      const digits = phoneNumber.replace(/\D/g, "");
      // Format: (XX) XXXXX-XXXX
      if (digits.length === 11) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }
      // fallback: show as is
      return phoneNumber;
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => {
      const patient = params.row.original;
      return patient.sex === "male" ? "Masculino" : "Feminino";
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const patient = params.row.original;
      return <PatientsTableActions patient={patient} />;
    },
  },
];
