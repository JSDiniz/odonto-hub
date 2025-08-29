"use client";

import { CheckCircle, Mail, Phone, Star } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleAuthenticationClick = () => {
    redirect("/authentication");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Odonto Hub" width={36} height={36} />
            <span className="text-xl font-bold text-blue-600"> Odonto Hub</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="hidden cursor-pointer bg-transparent md:inline-flex"
              onClick={handleAuthenticationClick}
            >
              Entrar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-16">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="border-blue-200 bg-blue-100 text-blue-700"
                >
                  Gestão odontológica descomplicada
                </Badge>
                <h1 className="text-4xl leading-tight font-bold text-gray-900 lg:text-5xl">
                  Centralize sua clínica, otimize seu tempo e foque no
                  atendimento
                </h1>
                <p className="text-lg leading-relaxed text-gray-600">
                  Controle pacientes, médicos e agendamentos em um só lugar.
                  Tenha uma visão clara da sua clínica e tome decisões com base
                  em dados reais.
                </p>
              </div>

              {/* <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Teste grátis agora
                </Button>
                <Button size="lg" variant="outline">
                  Fale com um especialista
                </Button>
              </div> */}

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gray-300"
                    ></div>
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Mais de 1.200 dentistas já confiam na Odonto Hub
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder-6cxzm.png"
                  alt="Dashboard Odonto Hub"
                  width={600}
                  height={400}
                  className="rounded-l-xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-blue-200 opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-blue-300 opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Organização Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Organização e produtividade para sua clínica
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Gerencie todos os dados da sua clínica de forma simples, visual e
              eficiente. Centralize informações de pacientes, médicos e
              agendamentos em um só sistema.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/dental-clinic-software.png"
              alt="Interface Odonto Hub"
              width={800}
              height={400}
              className="mx-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Agendamentos Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  Controle de agendamentos
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900">
                  Agenda prática e eficiente
                </h3>
                <p className="text-lg text-gray-600">
                  Visualize, crie e gerencie consultas de forma rápida. Evite
                  conflitos de horários e tenha controle total sobre os
                  atendimentos da sua clínica.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">
                    Visualização diária, semanal e mensal dos agendamentos
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">
                    Cadastro e edição de consultas com poucos cliques
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">
                    Acompanhamento do status dos atendimentos
                  </span>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Quero organizar minha agenda
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/dental-appointment-scheduling.png"
                alt="Agenda Odontológica"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Médicos Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/dental-app-interface.png"
                alt="Cadastro de Médicos"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 space-y-8 lg:order-2">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  Gestão de profissionais
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900">
                  Cadastre e organize sua equipe
                </h3>
                <p className="text-lg text-gray-600">
                  Mantenha o cadastro dos profissionais sempre atualizado, com
                  especialidades e horários de atendimento organizados.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">
                    Cadastro de médicos e especialidades
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">
                    Controle de horários de atendimento
                  </span>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Quero organizar minha equipe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pacientes Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  Gestão de pacientes
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900">
                  Cadastro e histórico dos seus pacientes
                </h3>
                <p className="text-lg text-gray-600">
                  Tenha fácil acesso ao cadastro, contatos e histórico de
                  atendimentos de todos os pacientes da clínica.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">
                    Cadastro completo de pacientes
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">
                    Histórico de consultas e atendimentos
                  </span>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Quero gerenciar meus pacientes
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/patient-portal-mobile-app.png"
                alt="Cadastro de Pacientes"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Sua clínica merece o melhor da tecnologia
            </h2>
            <p className="text-xl text-blue-100">
              Junte-se a centenas de profissionais que já transformaram sua
              rotina com Odonto Hub. Atendimento humanizado, suporte ágil e
              evolução constante para o seu consultório.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="cursor-pointer bg-white text-blue-600 hover:bg-gray-100"
              onClick={handleAuthenticationClick}
            >
              Comece agora mesmo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/logo.svg"
                  alt="Odonto Hub"
                  width={36}
                  height={36}
                />
                <span className="text-xl font-bold text-blue-600">
                  Odonto Hub
                </span>
              </div>
              <p className="text-gray-400">
                A plataforma odontológica que conecta tecnologia, gestão e
                excelência clínica.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 4042-0842</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@odontohub.com.br</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Odonto Hub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
