"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import dayjs from "dayjs"
import { DollarSign } from "lucide-react"
import { formatCurrencyInCents } from "@/helpers/currency"

export const description = "A stacked area chart"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

interface RevenueChartProps {
    dailyAppointmentsDate: {
        date: string;
        appointments: number;
        revenue: number;
    }[];
}

export function AppointmentsChart({ dailyAppointmentsDate }: RevenueChartProps) {
    const chartDays = Array.from({ length: 21 }).map((_, i) =>
        dayjs()
            .subtract(10 - i, "days")
            .format("YYYY-MM-DD")
    );

    const chartDate = chartDays.map((date) => {
        const dayData = dailyAppointmentsDate.find((item) => item.date === date);

        return {
            date: dayjs(date).format("DD/MM"),
            fullDate: date,
            appointments: dayData?.appointments || 0,
            revenue: dayData?.revenue || 0
        }
    })

    const chartConfig = {
        appointments: {
            label: "Agendamentos",
            color: "#0B68F7"
        },
        revenue: {
            label: "Faturamento",
            color: "#10B981"
        }
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <DollarSign className="text-muted-foreground"/>
                <CardTitle>
                    Agendamentos e Faturamento
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px]">
                    <AreaChart
                        data={chartDate}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="data"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />

                        <YAxis
                            yAxisId="left"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />

                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => formatCurrencyInCents(value)}
                        />

                        <ChartTooltip
                            // cursor={false}
                            content={
                                <ChartTooltipContent
                                    formatter={(value, name) => {
                                        if (name === "revenue") {
                                            return (
                                                <>
                                                    <div className="h-3 w-3 rounded bg-[#10B981]" />
                                                    <span className="text-muted-foreground">
                                                        Faturamento:
                                                    </span>
                                                    <span>
                                                        {formatCurrencyInCents(Number(value))}
                                                    </span>
                                                </>
                                            );
                                        }
                                        return (
                                            <>
                                                <div className="h-3 w-3 rounded bg-[#0B68F7]" />
                                                <span className="text-muted-foreground">
                                                    Agendamentos:
                                                </span>
                                                <span className="font-semibold">{value}</span>
                                            </>
                                        )
                                    }}
                                    labelFormatter={(label, payload) => {
                                        if (payload && payload[0]) {
                                            return dayjs(payload[0].payload?.fullDate).format(
                                                "DD/MM/YYYY (dddd)",
                                            );
                                        }

                                        return label;
                                    }}

                                />
                            }
                        />

                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="appointments"
                            stroke="var(--color-appointments)"
                            fill="var(--color-appointments)"
                            fillOpacity={0.2}
                            strokeWidth={2}
                        />

                        <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--color-revenue)"
                            fill="var(--color-revenue)"
                            fillOpacity={0.2}
                            strokeWidth={2}
                        />

                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
