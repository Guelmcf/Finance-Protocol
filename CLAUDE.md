@AGENTS.md

Protocolo Financeiro — Project Context for Claude
What This Project Is
A personal finance web app built by Miguel, a software engineering student at intermediate-beginner level.
Goals: land first dev job, learn genuinely, build an honest portfolio.
Tech Stack

Next.js 16 (App Router, TypeScript)
Tailwind CSS
PostgreSQL via Supabase
Prisma ORM v7 with PrismaPg adapter (client generated to ./app/generated/prisma)
Supabase Auth
Anthropic SDK (planned, for AI assistant feature)
Vercel (deployment)

Project Structure
app/
  (app)/                  ← route group for authenticated pages
    dashboard/
      page.tsx
    transactions/
      page.tsx            ← in progress
  login/
    page.tsx
  register/
    page.tsx
  layout.tsx              ← root layout (html, body, fonts)
  generated/
    prisma/               ← generated Prisma client (DO NOT edit manually)
components/
  NavbarProvider.tsx      ← manages nav state (isShrunken), renders correct navbar
  Navbar.tsx              ← desktop sidebar, collapsible
  BottomNavBar.tsx        ← mobile bottom navigation
actions/
  transactions.ts         ← Server Actions for transaction CRUD (in progress)
lib/
  prisma.ts               ← Prisma singleton with PrismaPg adapter
utils/
  supabase/
    client.ts             ← Supabase browser client
    server.ts             ← Supabase server client (cookie-based)
proxy.ts                  ← Route protection (Next.js 16 middleware equivalent)
prisma/
  schema.prisma           ← DB schema
prisma.config.ts          ← Prisma config (points output to app/generated/prisma)
Key Architecture Decisions

proxy.ts (NOT middleware.ts) — Next.js 16 renamed middleware to proxy
Route groups: (app) wraps all authenticated pages — does NOT appear in URL
NavbarProvider is a Client Component that owns sidebar state
Navbar (desktop) and BottomNavBar (mobile) are presentational — receive props only
Server Actions used for all DB writes (never expose Prisma to client)
Prisma singleton uses globalThis pattern to prevent multiple connections

Database Schema (key tables)

User, Transaction, Goal, Bill, WishList, Budget, BudgetCategory
Enums: TransactionType (income/expense), TransactionCategorie, PriorityList, WishListCategorie, BudgetCategorie
All tables relate to User as parent

Current State

Auth flow complete (login, register, logout, proxy protection)
Desktop navbar: collapsible sidebar with icons/labels
Mobile navbar: fixed bottom bar
Transactions page: in progress (createTransaction Server Action being built)

What's Next (planned order)

Complete createTransaction Server Action
Transaction form (modal/popup)
Quick buttons panel (preset transaction shortcuts)
Transaction list with date grouping
Goals, Bills, WishList CRUD
Dashboard (aggregates data from above)
Calendar view for transactions
AI assistant (conversational, voice, photo)

Pending Tasks (backlog)

Tooltips on collapsed navbar icons
Keybindings for page navigation
Logout inside Settings on mobile
Public GitHub README

Important Notes

Prisma generate output: ./app/generated/prisma (not default location)
Import Prisma client: import { PrismaClient } from "../app/generated/prisma/client"
Import prisma singleton: import { prisma } from "@/lib/prisma"
Supabase project can freeze after inactivity — reactivate at supabase.com if auth fails
Stale browser cookies can cause false authentication — test auth flows in incognito
Conventional Commits convention used for all commits
Branch naming: feat/feature-name