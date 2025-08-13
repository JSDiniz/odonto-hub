import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Stethoscope } from "lucide-react"

interface TopDoctoresProps {
    doctors: {
        id: string
        name: string
        avatarImageUrl: string | null
        specialty: string
        appointments: number
    }[]
}

export function TopDoctores({ doctors }: TopDoctoresProps) {
    return (
        <Card className="mx-auto w-full">
            <CardContent>

                <div className="mb-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <Stethoscope className="text-muted-foreground" />
                        <CardTitle className="test-base">
                            Médicos
                        </CardTitle>
                    </div>
                    {/* <button className="text-blue-500 text-sm font-medium hover:text-blue-600">Ver todos</button> */}
                </div>

                {/* Doctors List */}
                <div className="space-y-6">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={doctor.avatarImageUrl || undefined} alt={doctor.name} />
                                    <AvatarFallback className="bg-gray-100 text-base font-medium text-gray-600">
                                        {doctor.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-sm">Dr. {doctor.name}</h3>
                                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-muted-foreground text-sm font-medium">
                                    {doctor.appointments} agend.
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
