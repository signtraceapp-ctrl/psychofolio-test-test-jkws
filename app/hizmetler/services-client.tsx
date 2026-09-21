"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SiteContent } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesClient({ content: c }: { content: SiteContent }) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });

      gsap.from("[data-service]", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-service-list]",
          start: "top 80%",
          once: true,
        },
      });
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef}>
      <section className="py-28 bg-bg text-fg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl space-y-16">
            <div data-reveal className="text-center space-y-4">
              <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-bold">Hizmet Alanları</p>
              <h1 className="font-display text-4xl font-light text-fg tracking-tight">Terapi Hizmetleri</h1>
              <div className="w-12 h-px bg-primary/30 mx-auto mt-6" />
            </div>

            {/* Vertical list */}
            <div data-service-list className="divide-y divide-primary/10">
              {c.services.map((s, i) => (
                <div key={i} data-service className="py-10 first:pt-0 last:pb-0 space-y-4 group">
                  <div className="flex justify-between items-baseline gap-4">
                    <h2 className="font-display text-2xl font-light text-fg group-hover:text-primary transition-colors">{s.title}</h2>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary/60 shrink-0 bg-primary/5 rounded-full px-2.5 py-0.5 font-medium">{s.duration}</span>
                  </div>
                  <p className="text-sm text-fg-muted leading-relaxed font-light">{s.desc}</p>
                  <p className="text-[10px] italic tracking-wide text-fg-muted/50">{s.method}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
