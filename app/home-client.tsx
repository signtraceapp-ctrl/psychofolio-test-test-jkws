"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Quote } from "lucide-react";
import type { SiteContent } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeClient({ content: c }: { content: SiteContent }) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.from("[data-hero-text]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from("[data-hero-card]", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      /* Scroll reveals */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      /* Service items stagger */
      gsap.from("[data-service-item]", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-services]",
          start: "top 80%",
          once: true,
        },
      });

      /* Metrics counter */
      gsap.from("[data-metric]", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-metrics]",
          start: "top 85%",
          once: true,
        },
      });
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef} className="font-sans selection:bg-primary/20 bg-bg text-fg">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-20 bg-gradient-to-b from-bg via-bg to-bg-secondary/40">
        {/* Ambient organic lights */}
        <div className="absolute top-1/4 left-1/3 -z-10 h-72 w-72 rounded-full bg-primary/8 blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-16 md:flex-row md:gap-10">
            <div data-hero-text className="max-w-xl text-center md:text-left space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
                <Sparkles className="h-3 w-3" /> {c.home.badge}
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight text-fg leading-[1.15]">
                {c.home.headline}<br />
                <span className="italic text-primary font-normal">{c.home.headlineAccent}</span> {c.home.headlineSuffix}
              </h1>
              <p className="max-w-md text-base leading-relaxed text-fg-muted font-light">
                {c.home.description}
              </p>
              <div className="h-px w-24 bg-primary/30 my-6 hidden md:block" />
              <div className="pt-2">
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center rounded-full px-10 py-3 text-sm font-medium shadow-sm transition-[transform,background-color] duration-300 hover:scale-[1.02] bg-primary text-primary-fg hover:bg-primary-hover"
                >
                  {c.home.cta}
                </a>
              </div>
            </div>

            {/* Serene Vertical Card */}
            <div data-hero-card className="relative w-full max-w-[340px]">
              <div className="overflow-hidden rounded-[24px] border border-primary/15 bg-bg p-3 shadow-xl">
                <Image
                  src="/serene_hero.png"
                  alt="Sakin terapi ortamı"
                  width={340}
                  height={453}
                  className="aspect-[3/4] w-full rounded-[18px] object-cover"
                  priority
                />
                <div className="mt-4 p-2 text-center">
                  <p className="font-display text-lg italic text-fg">{c.home.cardTitle}</p>
                  <p className="text-[11px] uppercase tracking-wider text-primary/60 mt-1">{c.home.cardSubtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-28 bg-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mx-auto max-w-2xl text-center space-y-8">
            <div className="w-12 h-px bg-primary/30 mx-auto" />
            <Quote className="h-8 w-8 text-primary/20 mx-auto" />
            <p className="font-display text-2xl italic leading-relaxed text-fg/80">
              &ldquo;{c.home.quote}&rdquo;
            </p>
            <p className="text-xs tracking-[0.3em] uppercase text-fg-muted">{c.home.quoteAuthor}</p>
            <div className="w-12 h-px bg-primary/30 mx-auto" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-bg-secondary/30 border-y border-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-services className="mx-auto max-w-3xl space-y-16">
            <h2 data-reveal className="font-display text-3xl font-light text-center text-fg tracking-tight">Çalışma Alanları</h2>
            <div className="space-y-6">
              {c.services.map((s, i) => (
                <div
                  key={i}
                  data-service-item
                  className="flex flex-col md:flex-row md:items-center justify-between border-l-2 border-primary/30 pl-8 py-2 space-y-3 md:space-y-0 cursor-pointer group hover:translate-x-[10px] transition-transform duration-300"
                >
                  <div className="space-y-1.5 max-w-lg">
                    <h3 className="font-display text-xl text-fg group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-sm text-fg-muted font-light leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-primary/60 bg-primary/5 rounded-full px-3 py-1 self-start md:self-auto font-medium">
                    {s.duration} · {s.method}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-metrics className="flex flex-wrap justify-center gap-12 md:gap-24">
            {(c.metrics ?? []).map((m, i) => (
              <div key={i} data-metric className="text-center group">
                <p className="font-display text-4xl font-light text-primary/90 transition-transform group-hover:scale-105 duration-300">{m.val}</p>
                <p className="mt-2 text-[10px] tracking-[0.2em] uppercase text-fg-muted font-semibold">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
