import Link from "next/link";
import {
  ArrowRight,
  Container,
  Database,
  Layers,
  Palette,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { CurrentYear } from "@/components/shared/current-year";

// TODO: ganti dengan link repo GitHub kamu
const GITHUB_URL = "https://github.com/username/nextjs-starter";

const features = [
  {
    icon: Zap,
    title: "Next.js App Router",
    desc: "TypeScript, ESLint, dan alias import @/* sudah siap dari awal.",
  },
  {
    icon: Palette,
    title: "Tailwind + shadcn/ui",
    desc: "Komponen UI yang rapi dan mudah dikustomisasi, dark mode ready.",
  },
  {
    icon: Database,
    title: "Prisma + PostgreSQL",
    desc: "Singleton client dan struktur service yang siap dipakai CRUD.",
  },
  {
    icon: ShieldCheck,
    title: "Form & Validasi",
    desc: "React Hook Form + Zod + resolver, tipe diturunkan dari schema.",
  },
  {
    icon: Container,
    title: "Docker Compose",
    desc: "Database lokal jalan dengan satu perintah, tanpa install manual.",
  },
  {
    icon: Layers,
    title: "Struktur Folder Rapi",
    desc: "Pemisahan services, schemas, types, dan components yang jelas.",
  },
];

const steps = [
  "cp .env.example .env",
  "docker compose up -d",
  "npm install",
  "npx prisma migrate dev",
  "npm run dev",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-0 -z-10 h-72 w-160 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
            <span className="rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              Next.js · Prisma · shadcn/ui · Zod
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Mulai project fullstack,
              <br />
              <span className="text-muted-foreground">
                tanpa setup dari nol.
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Starter pack siap pakai dengan stack modern. Clone, isi{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                .env
              </code>
              , lalu langsung fokus ke fitur.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                Use this template
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#quickstart"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                )}
              >
                Lihat cara pakai
              </a>
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ size: "lg", variant: "secondary" }),
                )}
              >
                Lihat demo CRUD
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-20 mx-auto w-full max-w-6xl px-6 py-20"
        >
          <div className="mb-12 space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Semua yang kamu butuhkan
            </h2>
            <p className="text-muted-foreground">
              Setup yang biasanya makan waktu, sudah dikerjakan.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-1 font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick start */}
        <section id="quickstart" className="scroll-mt-20 border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20">
            <div className="mb-10 space-y-3 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Quick Start</h2>
              <p className="text-muted-foreground">
                Lima perintah dari clone sampai jalan.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-3">
                <span className="size-3 rounded-full bg-foreground/15" />
                <span className="size-3 rounded-full bg-foreground/15" />
                <span className="size-3 rounded-full bg-foreground/15" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  terminal
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-7">
                {steps.map((s) => (
                  <div key={s}>
                    <span className="select-none text-muted-foreground">
                      ${" "}
                    </span>
                    {s}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            ©{" "}
            <Suspense fallback="2026">
              <CurrentYear />
            </Suspense>{" "}
            Next.js Starter Pack.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Source di GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
