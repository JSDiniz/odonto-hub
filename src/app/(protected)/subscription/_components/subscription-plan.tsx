"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { createStripeCheckout } from "@/app/actions/create-stripe-checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface SubscriptionPlanProps {
  active?: boolean;
}

export function SubscriptionPlan({ active = false }: SubscriptionPlanProps) {
  const createStripeCheckoutAction = useAction(createStripeCheckout, {
    onSuccess: async ({ data }) => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable not found");
      }

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );

      if (!stripe) {
        throw new Error("Stripe not found");
      }

      if (!data?.sessionId) {
        throw new Error("Session ID not found");
      }

      await stripe.redirectToCheckout({
        sessionId: data?.sessionId,
      });
    },
  });

  const features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via e-mail",
    "Exportação em CSV",
  ];

  const handleSubscribeClick = () => {
    createStripeCheckoutAction.execute();
  };

  return (
    <Card className="relative w-full max-w-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-foreground text-xl font-semibold">Essential</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Para profissionais autônomos ou pequenas clínicas
            </p>
          </div>
          {active && (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
            >
              Atual
            </Badge>
          )}
        </div>

        <div className="mt-4">
          <span className="text-foreground text-3xl font-bold">R$59</span>
          <span className="text-muted-foreground ml-1">/ mês</span>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full cursor-pointer"
          variant={active ? "outline" : "default"}
          onClick={active ? () => {} : handleSubscribeClick}
          disabled={createStripeCheckoutAction.isExecuting}
        >
          {createStripeCheckoutAction.isExecuting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : active ? (
            "Gerenciar assinatura"
          ) : (
            "Fazer assinatura"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
