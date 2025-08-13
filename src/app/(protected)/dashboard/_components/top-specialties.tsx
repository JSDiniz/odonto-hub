import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Hospital } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface TopSpecialtiesProps {
    topSpecialties: {
        specialty: string;
        appointments: number;
    }[]
}

export function TopSpecialties({ topSpecialties }: TopSpecialtiesProps) {

    const maxAppointments = Math.max(...topSpecialties.map(i => i.appointments))

    return (
        <Card className="mx-auto w-full">
            <CardContent>

                <div className="mb-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <Hospital className="text-muted-foreground" />
                        <CardTitle className="test-base">
                            Especialidades
                        </CardTitle>
                    </div>
                    {/* <button className="text-blue-500 text-sm font-medium hover:text-blue-600">Ver todos</button> */}
                </div>

                {/* Specialty List */}
                <div className="space-y-6">
                    {topSpecialties.map((specialty) => (
                        <div
                            key={specialty.specialty}
                            className=" flex items-center gap-2"
                        >
                            <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gray-100 text-base font-medium text-gray-600">
                                    {specialty.specialty
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex w-full flex-col justify-center">
                                <div className="flex w-full justify-between">
                                    <h3 className="text-sm">{specialty.specialty}</h3>

                                    <div className="text-ring">
                                        <span className="text-muted-foreground text-sm font-medium">
                                            {specialty.appointments} agend.
                                        </span>
                                    </div>
                                </div>

                                {/* Porcentagem de ocupação de especialidade baseando-se no maior número de agendamentos */}
                                <Progress value={(specialty.appointments / maxAppointments) * 100} />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
