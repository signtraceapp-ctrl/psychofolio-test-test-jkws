"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SiteContent } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FaqClient({ content: c }: { content: SiteContent }) {
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

      gsap.from("[data-faq-item]", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-faq-list]",
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
              <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-bold">Merak Edilenler</p>
              <h1 className="font-display text-4xl font-light text-fg tracking-tight">Sık Sorulan Sorular</h1>
              <div className="w-12 h-px bg-primary/30 mx-auto mt-6" />
            </div>

            {/* Open Q&A */}
            <div data-faq-list className="divide-y divide-primary/10">
              {c.faq.map((f, i) => (
                <div key={i} data-faq-item className="py-8 first:pt-0 space-y-4 group">
                  <h3 className="font-display text-xl text-fg group-hover:text-primary transition-colors">{f.q}</h3>
                  <p className="text-sm text-fg-muted font-light leading-relaxed italic pl-4 border-l border-primary/20">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
