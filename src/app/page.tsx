import { Hero } from "@/components/hero";
import { IdeaSection } from "@/components/idea-section";
import { SwarpPresale } from "@/components/swarp-presale";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <SectionErrorBoundary
        fallback={
          <section className="px-4 py-16 text-center text-slate-100 sm:px-6">
            <div className="mx-auto max-w-3xl rounded-2xl border border-cyan-300/20 bg-[#081326]/80 p-8">
              <h1 className="text-3xl font-semibold">Swarp Foundation</h1>
              <p className="mt-3 text-slate-300">Building secure, high-performance digital products.</p>
            </div>
          </section>
        }
      >
        <Hero />
      </SectionErrorBoundary>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan-400/8 to-transparent" />
        <SectionErrorBoundary
          fallback={
            <section className="px-4 py-10 text-center text-slate-100 sm:px-6">
              <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-300/20 bg-[#081326]/80 p-6">
                <h2 className="text-2xl font-semibold">SWARP Token Presale</h2>
                <p className="mt-2 text-slate-300">Presale purchase flow opens soon on swarppay.com.</p>
              </div>
            </section>
          }
        >
          <SwarpPresale />
        </SectionErrorBoundary>
      </div>
      <div className="relative pt-2 md:pt-4">
        <SectionErrorBoundary fallback={<div className="py-8" />}>
          <IdeaSection />
        </SectionErrorBoundary>
      </div>
    </main>
  );
}
