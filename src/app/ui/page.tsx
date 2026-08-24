import type { Metadata } from "next";
import {
  Package,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Download,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "UI Component Preview | wara-wiri",
  description: "Visual testing ground for all base UI components.",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const packages = [
  {
    name: "framer-motion",
    version: "13.1.1",
    description: "A production-ready motion library for React. Animate anything with fluid, spring-based physics.",
    badge: "success" as const,
    badgeLabel: "Stable",
    stars: "23k",
  },
  {
    name: "class-variance-authority",
    version: "0.7.1",
    description: "TypeScript-first variant API for building component libraries with zero-runtime overhead.",
    badge: "default" as const,
    badgeLabel: "Popular",
    stars: "8k",
  },
  {
    name: "zod",
    version: "4.4.3",
    description: "TypeScript-first schema validation with static type inference. Zero dependencies.",
    badge: "warning" as const,
    badgeLabel: "Latest",
    stars: "35k",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UIPreviewPage() {
  return (
    <div className="min-h-screen bg-light-100">
      {/* ── Header Banner ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white">
        <Container>
          <div className="py-12 text-center space-y-3">
            <Badge variant="default" className="bg-white/20 text-white border-0 mb-2">
              Developer Preview
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              UI Component Library
            </h1>
            <p className="text-primary-100 text-lg max-w-xl mx-auto">
              Visual testing ground for all base primitives — Buttons, Cards, Badges, and more.
            </p>
          </div>
        </Container>
      </div>

      {/* ── Buttons ───────────────────────────────────────────────────────── */}
      <Section
        heading="Buttons"
        description="All variants and sizes. Try clicking for the spring tap animation."
      >
        <div className="space-y-8">
          <Divider label="Intent variants (md)" />
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <Button intent="primary">Primary</Button>
            <Button intent="secondary">Secondary</Button>
            <Button intent="outline">Outline</Button>
            <Button intent="ghost">Ghost</Button>
          </div>

          <Divider label="Sizes — primary" />
          <div className="flex flex-wrap items-end gap-4 justify-center">
            <Button intent="primary" size="sm">Small</Button>
            <Button intent="primary" size="md">Medium</Button>
            <Button intent="primary" size="lg">Large</Button>
            <Button intent="primary" size="icon" aria-label="Download">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <Divider label="With icons" />
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <Button intent="primary">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button intent="secondary">
              <Zap className="h-4 w-4" /> Boost
            </Button>
            <Button intent="outline">
              <Shield className="h-4 w-4" /> Secure
            </Button>
            <Button intent="ghost">
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <Divider label="States" />
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <Button intent="primary" isLoading>
              Publishing…
            </Button>
            <Button intent="secondary" isLoading size="lg">
              Processing
            </Button>
            <Button intent="outline" disabled>
              Disabled
            </Button>
            <Button intent="ghost" disabled>
              Ghost Disabled
            </Button>
          </div>
        </div>
      </Section>

      {/* ── Badges ────────────────────────────────────────────────────────── */}
      <Section
        heading="Badges"
        description="Status indicators with semantic color variants."
        className="bg-white"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="default">Primary</Badge>
          <Badge variant="success">Shipped</Badge>
          <Badge variant="warning">Beta</Badge>
          <Badge variant="danger">Deprecated</Badge>
        </div>
      </Section>

      {/* ── Cards ─────────────────────────────────────────────────────────── */}
      <Section
        heading="Cards"
        description="Hover over each card to see the lift + shadow animation."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.name}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary-50 p-2.5">
                      <Package className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{pkg.name}</CardTitle>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        v{pkg.version}
                      </p>
                    </div>
                  </div>
                  <Badge variant={pkg.badge}>{pkg.badgeLabel}</Badge>
                </div>
                <CardDescription className="mt-3">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Star className="h-4 w-4 text-accent fill-accent" />
                  <span className="font-semibold text-gray-700">{pkg.stars}</span>
                  <span>stars on GitHub</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button intent="ghost" size="sm" className="text-xs">
                  View Docs
                </Button>
                <Button intent="primary" size="sm" className="text-xs">
                  Install <Download className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Dark Mode Demo ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-dark">
        <Container>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-light">
              Dark Mode Preview
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Components rendered on the dark background using the{" "}
              <code className="text-primary-300 bg-primary-900/30 px-1.5 py-0.5 rounded text-sm">
                dark
              </code>{" "}
              color token.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Dark card */}
            <Card className="dark border-gray-700 bg-dark-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary-900/60 p-2.5">
                    <Zap className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <CardTitle className="text-light text-base">
                      Dark Card
                    </CardTitle>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">
                      bg-dark-700
                    </p>
                  </div>
                </div>
                <CardDescription className="text-gray-400 mt-3">
                  This card renders correctly on dark backgrounds using
                  explicit dark palette tokens.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="default">v1.0</Badge>
                  <Badge variant="success">Active</Badge>
                  <Badge variant="warning">Beta</Badge>
                </div>
              </CardContent>
              <CardFooter className="border-gray-700 bg-dark-800/60">
                <Button intent="ghost" size="sm" className="text-gray-300 hover:bg-gray-700 hover:text-white text-xs">
                  Cancel
                </Button>
                <Button intent="primary" size="sm" className="text-xs">
                  Confirm
                </Button>
              </CardFooter>
            </Card>

            {/* Buttons on dark */}
            <div className="space-y-5 flex flex-col justify-center">
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
                Buttons on dark
              </p>
              <div className="flex flex-wrap gap-3">
                <Button intent="primary">Primary</Button>
                <Button intent="secondary">Secondary</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button intent="outline" className="border-primary-400 text-primary-300 hover:bg-primary-900/30">
                  Outline
                </Button>
                <Button intent="ghost" className="text-gray-300 hover:bg-gray-700">
                  Ghost
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button intent="primary" isLoading>
                  Saving…
                </Button>
                <Button intent="outline" disabled className="border-gray-600 text-gray-500">
                  Disabled
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Section Component Demo ────────────────────────────────────────── */}
      <Section
        heading="Section Component"
        description="This text block is itself rendered by the Section component with align=center. Scroll up/down to watch the heading and description animate in."
        align="center"
        className="bg-gradient-to-b from-white to-light-200"
      >
        <div className="flex justify-center gap-4 flex-wrap mt-4">
          <Button intent="primary" size="lg">
            Get Started <ArrowRight className="h-5 w-5" />
          </Button>
          <Button intent="outline" size="lg">
            Learn More
          </Button>
        </div>
      </Section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white">
        <Container>
          <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-dark">wara-wiri</span> — UI Preview{" "}
              <Badge variant="default" className="ml-1 text-[10px] py-0.5">
                Dev
              </Badge>
            </p>
            <div className="flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 text-gray-300 animate-spin" />
              <span className="text-xs text-gray-400">Hot-reload active</span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
