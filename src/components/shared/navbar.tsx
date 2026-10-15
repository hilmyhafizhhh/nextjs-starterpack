import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { cn } from "@/lib/utils";

// TODO: ganti dengan link repo GitHub kamu
const GITHUB_URL = "https://github.com/username/nextjs-starter";

const links = [
  { href: "/#features", label: "Fitur" },
  { href: "/#quickstart", label: "Quick Start" },
  { href: "/products", label: "Demo" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
            N
          </span>
          Starter Pack
        </Link>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden transition-colors hover:text-foreground sm:block"
            >
              {l.label}
            </Link>
          ))}
          <ModeToggle />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
