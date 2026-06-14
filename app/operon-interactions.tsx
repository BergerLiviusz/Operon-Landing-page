"use client";

import { useEffect } from "react";

export default function OperonInteractions() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-enabled");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const header = document.querySelector<HTMLElement>(".site-header");
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"),
    );
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]"),
    );
    const hero = document.querySelector<HTMLElement>("[data-hero]");

    const setHeaderState = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    revealItems
      .filter((item) => item.closest("[data-hero]"))
      .forEach((item) => item.classList.add("is-visible"));

    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      counters.forEach((counter) => {
        counter.textContent = `${counter.dataset.count ?? ""}${
          counter.dataset.suffix ?? ""
        }`;
      });
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
      );

      revealItems.forEach((item, index) => {
        item.style.setProperty("--reveal-index", String(index % 6));
        revealObserver.observe(item);
      });

      const countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const element = entry.target as HTMLElement;
            const target = Number(element.dataset.count ?? "0");
            const decimals = Number(element.dataset.decimals ?? "0");
            const suffix = element.dataset.suffix ?? "";
            const start = performance.now();
            const duration = 920;

            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              element.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                element.textContent = `${target.toFixed(decimals)}${suffix}`;
              }
            };

            requestAnimationFrame(tick);
            countObserver.unobserve(element);
          });
        },
        { threshold: 0.5 },
      );

      counters.forEach((counter) => countObserver.observe(counter));
    }

    const sections = ["platform", "modules", "security", "support", "demo"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const id = visible.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.navLink === id);
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => activeObserver.observe(section));

    const onPointerMove = (event: PointerEvent) => {
      if (!hero || prefersReducedMotion) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      hero.style.setProperty("--pointer-x", x.toFixed(3));
      hero.style.setProperty("--pointer-y", y.toFixed(3));
    };

    hero?.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", setHeaderState);
      hero?.removeEventListener("pointermove", onPointerMove);
      activeObserver.disconnect();
      root.classList.remove("js-enabled");
    };
  }, []);

  return null;
}
