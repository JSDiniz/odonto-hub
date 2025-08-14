import { and, count, desc, eq, gte, lte, sql, sum } from "drizzle-orm";

import { db } from "@/db";
import { appointments } from "@/db/schema/appointments";
import { doctors } from "@/db/schema/doctors";
import { patients } from "@/db/schema/patients";

import dayjs from "dayjs";

interface Parms {
    from: string;
    to: string;
    session: {
        user: {
            clinic: {
                id: string;
            };
        };
    };
}

export const getDashboard = async ({ from, to, session }: Parms) => {
    const chartStartDate = dayjs().subtract(10, "days").startOf("day").toDate();
    const chartEndDate = dayjs().add(10, "days").startOf("day").toDate();

    const now = new Date();

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const [
        [totalRevenue],
        [totalAppointments],
        [totalPatiets],
        [totalDoctores],
        topDoctores,
        topSpecialties,
        todayAppointments,
        dailyAppointmentsDate,
    ] =
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
            db
                .select({
                    id: doctors.id,
                    name: doctors.name,
                    avatarImageUrl: doctors.avatarImageUrl,
                    specialty: doctors.specialty,
                    appointments: count(appointments.id)
                })
                .from(doctors)
                .leftJoin(
                    appointments,
                    and(
                        eq(appointments.doctorId, doctors.id),
                        gte(appointments.date, new Date(from)),
                        lte(appointments.date, new Date(to))
                    ),
                )
                .where(eq(doctors.clinicId, session.user.clinic.id))
                .groupBy(doctors.id)
                .orderBy(desc(count(appointments.id)))
                .limit(10),
            db
                .select({
                    specialty: doctors.specialty,
                    appointments: count(appointments.id)
                })
                .from(appointments)
                .innerJoin(doctors, eq(appointments.doctorId, doctors.id))
                .where(
                    and(
                        eq(appointments.clinicId, session.user.clinic.id),
                        gte(appointments.date, new Date(from)),
                        lte(appointments.date, new Date(to))
                    ),
                )
                .groupBy(doctors.specialty)
                .orderBy(desc(count(appointments.id))),
            db.query.appointments.findMany({
                where: and(
                    eq(appointments.clinicId, session.user.clinic.id),
                    gte(appointments.date, startOfDay),
                    lte(appointments.date, endOfDay)
                ),
                with: {
                    patient: true,
                    doctors: true,
                }
            }),
            db.select({
                date: sql<string>`DATE(${appointments.date})`.as("date"),
                appointments: count(appointments.id),
                revenue:
                    sql<number>`COALESCE(SUM(${appointments.appointmentPriceInCents}), 0)`.as("revenue")
            })
                .from(appointments)
                .where(
                    and(
                        eq(appointments.clinicId, session.user.clinic.id),
                        gte(appointments.date, chartStartDate),
                        lte(appointments.date, chartEndDate)
                    )
                )
                .groupBy(sql`DATE(${appointments.date})`)
                .orderBy(sql`DATE(${appointments.date})`),
        ]);


    return {
        totalRevenue,
        totalAppointments,
        totalPatiets,
        totalDoctores,
        topDoctores,
        topSpecialties,
        todayAppointments,
        dailyAppointmentsDate
    }
}