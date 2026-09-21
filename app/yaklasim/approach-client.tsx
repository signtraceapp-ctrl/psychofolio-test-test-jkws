"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SiteContent } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ApproachClient({ content: c }: { content: SiteContent }) {
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

      gsap.from("[data-principle]", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-principles]",
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
          <div className="mx-auto max-w-xl space-y-16 text-center">
            <div data-reveal className="space-y-4">
              <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-bold">Felsefem</p>
              <h1 className="font-display text-4xl font-light text-fg tracking-tight">{c.approach.title}</h1>
              <div className="w-12 h-px bg-primary/30 mx-auto mt-6" />
            </div>

            <p data-reveal className="text-lg font-light leading-[1.8] text-fg-muted/80 italic">
              {c.approach.intro}
            </p>

            {/* Principles */}
            <div data-principles className="space-y-12 text-left pt-6">
              {c.approach.principles.map((p, i) => (
                <div key={i} data-principle className="border-l-2 border-primary/20 pl-8 space-y-3">
                  <h3 className="font-display text-xl text-fg font-medium">{p.title}</h3>
                  <p className="text-sm text-fg-muted font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
