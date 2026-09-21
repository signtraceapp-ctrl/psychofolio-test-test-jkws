"use client";

import { useContactForm } from "@/lib/use-contact-form";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Mail, MapPin } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function ContactClient({ content: c }: { content: SiteContent }) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const ad = (form.elements.namedItem("ad") as HTMLInputElement)?.value ?? "";
    const eposta = (form.elements.namedItem("eposta") as HTMLInputElement)?.value ?? "";
    const mesaj = (form.elements.namedItem("mesaj") as HTMLTextAreaElement)?.value ?? "";
    const subject = encodeURIComponent("İletişim Formu");
    const body = encodeURIComponent(`Ad: ${ad}\nE-posta: ${eposta}\n\n${mesaj}`);
    window.location.href = `mailto:${c.site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
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
              <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-bold">İletişim</p>
              <h1 className="font-display text-4xl font-light text-fg tracking-tight">{c.contact.title}</h1>
              <div className="w-12 h-px bg-primary/30 mx-auto mt-6" />
            </div>

            <p data-reveal className="text-center text-sm text-fg-muted font-light">
              {c.contact.intro}
            </p>

            <div data-reveal className="space-y-10">
              <div className="flex flex-wrap justify-center gap-8 text-xs text-fg-muted font-semibold tracking-wider uppercase">
                <span className="flex items-center gap-2.5"><Mail className="h-4.5 w-4.5 text-primary/40" /> {c.site.email}</span>
                <span className="flex items-center gap-2.5"><MapPin className="h-4.5 w-4.5 text-primary/40" /> {c.site.address}</span>
              </div>

              {sent ? (
                <div className="max-w-md mx-auto text-center space-y-4 py-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-2">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-light text-fg">Mesajınız Hazırlandı</h3>
                  <p className="text-sm text-fg-muted font-light">
                    E-posta uygulamanız açıldı. Gönderdikten sonra en kısa sürede dönüş yapılacaktır.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="inline-flex items-center justify-center rounded-full px-10 py-2.5 text-xs font-semibold tracking-widest uppercase shadow-sm bg-primary text-primary-fg hover:opacity-90 transition-opacity"
                  >
                    Yeni Mesaj
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 max-w-md mx-auto">
                  <input
                    id="ad"
                    name="ad"
                    type="text"
                    required
                    placeholder={c.contact.formName}
                    className="w-full bg-transparent border-b border-primary/20 py-3.5 text-sm focus:outline-none focus:border-primary font-light placeholder:text-fg-muted/40 transition-colors"
                  />
                  <input
                    id="eposta"
                    name="eposta"
                    type="email"
                    required
                    placeholder={c.contact.formEmail}
                    className="w-full bg-transparent border-b border-primary/20 py-3.5 text-sm focus:outline-none focus:border-primary font-light placeholder:text-fg-muted/40 transition-colors"
                  />
                  <textarea
                    id="mesaj"
                    name="mesaj"
                    required
                    placeholder={c.contact.formMessage}
                    rows={3}
                    className="w-full bg-transparent border-b border-primary/20 py-3.5 text-sm focus:outline-none focus:border-primary font-light resize-none placeholder:text-fg-muted/40 transition-colors"
                  />
                  <div className="text-center pt-6">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full px-14 py-3 text-xs font-semibold tracking-widest uppercase shadow-sm bg-primary text-primary-fg hover:opacity-90 transition-opacity"
                    >
                      {c.contact.formSubmit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
