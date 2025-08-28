# Odonto Hub

Odonto Hub é uma plataforma web para gestão de clínicas odontológicas, desenvolvida com Next.js, React, Drizzle ORM e PostgreSQL. O sistema oferece recursos para controle de pacientes, agendamentos, médicos, clínicas e assinaturas, proporcionando uma visão completa e centralizada das operações da clínica.

## Funcionalidades

- **Dashboard**: Visão geral das principais métricas da clínica, como faturamento, agendamentos, pacientes e médicos.
- **Gestão de Agendamentos**: Criação, visualização e gerenciamento de consultas odontológicas.
- **Gestão de Pacientes**: Cadastro, listagem e gerenciamento de pacientes da clínica.
- **Gestão de Médicos**: Cadastro, listagem e gerenciamento dos profissionais da clínica.
- **Gestão de Clínicas**: Cadastro e configuração de informações da clínica.
- **Assinaturas**: Gerenciamento de planos de assinatura via Stripe.
- **Autenticação**: Controle de acesso seguro para usuários da clínica.
- **Relatórios e Gráficos**: Visualização de dados em gráficos e tabelas interativas.
- **Responsividade**: Interface adaptada para diferentes dispositivos.

## Tecnologias Utilizadas

- **Next.js** (App Router)
- **React 19**
- **TypeScript**
- **Drizzle ORM** (PostgreSQL)
- **Stripe** (pagamentos e assinaturas)
- **React Query**
- **Radix UI**
- **Tailwind CSS**
- **Zod** (validação)
- **Lucide React** (ícones)
- **Day.js / date-fns** (datas)
- **Recharts** (gráficos)

## Como rodar o projeto

1. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

2. Configure as variáveis de ambiente (exemplo: banco de dados, Stripe, etc).

3. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura de Pastas

- `src/app/`: Páginas e rotas da aplicação.
- `src/components/`: Componentes reutilizáveis de UI.
- `src/db/`: Configuração do banco de dados e schemas.
- `src/data/`: Funções de acesso a dados.
- `src/hooks/`: Hooks customizados.
- `src/lib/`: Bibliotecas auxiliares.
- `src/providers/`: Providers de contexto.
