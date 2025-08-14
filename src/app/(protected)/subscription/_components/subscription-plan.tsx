import { Check, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SubscriptionPlanProps {
  active?: boolean
}

export function SubscriptionPlan({ active = false }: SubscriptionPlanProps) {
  const features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via e-mail",
    "Exportação em CSV",
  ]

  return (
    <Card className="w-full max-w-sm relative">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Essential</h3>
            <p className="text-sm text-muted-foreground mt-1">Para profissionais autônomos ou pequenas clínicas</p>
          </div>
          {active && (
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              Atual
            </Badge>
          )}
        </div>

        <div className="mt-4">
          <span className="text-3xl font-bold text-foreground">R$59</span>
          <span className="text-muted-foreground ml-1">/ mês</span>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full cursor-pointer" variant={active ? "outline" : "default"}>
          {active ? "Gerenciar assinatura" : "Fazer assinatura"}
        </Button>
      </CardFooter>
    </Card>
  )
}
