"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SiteContent } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutClient({ content: c }: { content: SiteContent }) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });

      gsap.from("[data-timeline-item]", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-timeline]",
          start: "top 80%",
          once: true,
        },
      });
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef}>
      <section className="py-28 bg-bg text-fg relative overflow-hidden">
        {/* Decorative background light */}
        <div className="absolute top-1/3 left-1/4 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-[90px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-16 text-center">
            <div data-reveal className="space-y-4">
              <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-bold">Özgeçmiş</p>
              <h1 className="font-display text-4xl font-light text-fg tracking-tight">{c.about.title}</h1>
              <div className="w-12 h-px bg-primary/30 mx-auto mt-6" />
            </div>

            <div data-reveal className="space-y-8 text-base font-light leading-[1.9] text-fg-muted/80 italic">
              <p>{c.about.intro}</p>
              {c.about.introSecond && <p>{c.about.introSecond}</p>}
            </div>

            {/* Vertical timeline */}
            <div data-timeline className="space-y-2 pt-6">
              {c.about.credentials.map((cred, i) => (
                <div key={i} data-timeline-item className="relative py-6 max-w-md mx-auto group">
                  {i < c.about.credentials.length - 1 && <div className="absolute left-1/2 top-14 bottom-0 w-px bg-primary/15" />}
                  <div className="mx-auto w-2.5 h-2.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors mb-3" />
                  <p className="font-display italic text-primary text-sm font-semibold">{cred.year}</p>
                  <p className="text-sm text-fg mt-1.5 font-medium">{cred.title}</p>
                  <p className="text-xs text-fg-muted/60 font-light mt-1">{cred.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
