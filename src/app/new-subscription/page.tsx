import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "../(protected)/subscription/_components/subscription-plan";

const NewSubscription = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user.clinic) {
    redirect("/clinic-form");
  }

  if (session?.user.plan) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-balance text-slate-900">
            Desbloqueie Todo o Potencial da Sua Clínica
          </h1>

          <p className="text-lg text-pretty text-slate-600">
            Você está a apenas um passo de revolucionar a gestão da sua clínica.
            Milhares de profissionais já transformaram seus consultórios com
            nossa plataforma.
          </p>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-800">
              ✨ <strong>Oferta especial:</strong> Primeiros 30 dias com 50% de
              desconto
            </p>
          </div>
        </div>

        <SubscriptionPlan
          active={session.user.plan === "essential"}
          userEmail={session.user.email}
        />

        <div className="space-y-1 text-xs text-slate-500">
          <p>🔒 Pagamento 100% seguro</p>
          <p>📞 Suporte especializado incluído</p>
          <p>⚡ Ativação imediata</p>
        </div>
      </div>
    </div>
  );
};

export default NewSubscription;
