"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useGoda } from "@/content/schema-ext";
import { CARS, PROFILE, TEASER, type Car } from "@/content/media";
import { Ring } from "@/components/webgl/ring";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-6% 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--said-delay": `${d}ms` }) as CSSProperties;

/** This site's arrival: said. A block settles up a few pixels while a soft
 * blur resolves, as if the words were just finished being spoken. */
function Said({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  // A polymorphic tag's prop union is too wide for TS to resolve on its own.
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  return (
    <C ref={ref} data-said="" className={className} style={delayVar(delay)}>
      {children}
    </C>
  );
}

function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-said-rule=""
      className={`h-px w-full origin-[left_center] bg-ink/15 rtl:origin-[right_center] ${className ?? ""}`}
      style={delayVar(delay)}
    />
  );
}

function SectionHead({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <div>
      <Said className="label text-ring">{eyebrow}</Said>
      <Said as="h2" className="text-display font-display mt-3 max-w-[24ch] text-ink" delay={60}>
        {heading}
      </Said>
      <Rule className="mt-6" delay={110} />
      {intro ? (
        <Said className="text-lead mt-6 max-w-[68ch] leading-[1.8] text-ink-2" delay={160}>
          {intro}
        </Said>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const c = useGoda();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-ground/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[86rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[1.02rem] font-semibold text-ink">{c.brand.name}</span>
        </a>

        <nav className="ms-auto hidden items-center gap-7 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-[0.86rem] text-ink-2 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.phoneHref}
          className="latin tnum ms-auto shrink-0 text-[0.84rem] font-semibold text-ring transition-opacity hover:opacity-75 md:ms-0"
        >
          {PROFILE.phones[0]}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-ink/20 px-3 py-1.5 text-[0.7rem] text-ink-2 transition-colors hover:border-ring hover:text-ink"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------- hero -- */

function Hero({ selected }: { selected: number }) {
  const c = useGoda();
  const car = CARS[selected];

  return (
    <section id="top" className="relative pt-16">
      <div className="mx-auto max-w-[86rem] px-5 pt-10 sm:px-8 lg:pt-14">
        <Said className="label text-ring">{c.hero.eyebrow}</Said>
        <Said as="h1" className="text-hero font-display mt-4 max-w-[20ch] text-ink" delay={70}>
          {c.hero.headline}
        </Said>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <Said delay={30}>
            <Ring
              src={car.frames[0]}
              alt={c.hero.ringAlt}
              className="aspect-[4/3] w-full border border-ink/10 bg-ground-2"
            />
            <p dir="ltr" className="said mt-3 text-[1rem] text-ink">&ldquo;{car.line}&rdquo;</p>
            <p className="fine mt-1 text-ink-3">
              <span className="latin">{car.marque} {car.model}</span>
            </p>
          </Said>

          <div>
            <Said className="text-lead max-w-[50ch] leading-[1.85] text-ink-2" delay={140}>
              {c.hero.sub}
            </Said>

            <Said className="mt-9 flex flex-wrap items-center gap-3" delay={220}>
              <a
                href={PROFILE.phoneHref}
                className="bg-ring px-6 py-3 text-[0.9rem] font-medium text-ground transition-opacity hover:opacity-85"
              >
                {c.hero.primaryCta}
              </a>
              <a
                href="#record"
                className="border border-ink/25 px-6 py-3 text-[0.9rem] text-ink transition-colors hover:border-ring hover:text-ring"
              >
                {c.hero.secondaryCta}
              </a>
            </Said>

            <Said className="mt-12 grid grid-cols-2 gap-px border-t border-ink/15" delay={300}>
              {[
                { k: c.hero.followersLabel, v: PROFILE.followers },
                { k: c.hero.postsLabel, v: PROFILE.posts },
              ].map((s) => (
                <div key={s.k} className="pt-6">
                  <div className="tnum font-display text-[1.7rem] leading-none text-ink">
                    <span className="latin">{s.v}</span>
                  </div>
                  <div className="label mt-2 text-ink-2">{s.k}</div>
                </div>
              ))}
            </Said>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- record -- */

function RecordCard({
  car,
  index,
  selected,
  onSelect,
}: {
  car: Car;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const c = useGoda();

  const fields: { label: string; value: string }[] = [];
  if (car.trim) fields.push({ label: c.record.fieldLabels.trim, value: car.trim });
  if (car.mileageKm) {
    fields.push({
      label: c.record.fieldLabels.mileage,
      value: `${car.mileageKm.toLocaleString("en-US")} km`,
    });
  }
  if (car.supply) fields.push({ label: c.record.fieldLabels.supply, value: car.supply });
  if (car.condition) fields.push({ label: c.record.fieldLabels.condition, value: car.condition });

  return (
    <Said as="article" className="border-t border-ink/15 pt-8" delay={Math.min(index, 4) * 60}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <button
          onClick={onSelect}
          aria-pressed={selected}
          className={`aspect-[4/3] w-full overflow-hidden bg-ground-2 ring-1 transition-colors ${
            selected ? "ring-ring" : "ring-transparent hover:ring-ink/20"
          }`}
        >
          <img
            src={car.frames[0]}
            alt={`${car.marque} ${car.model}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </button>

        <div>
          <span className="tnum text-[0.76rem] text-ink-3">{String(index + 1).padStart(2, "0")}</span>
          <p dir="ltr" className="said mt-2 text-[1.15rem] leading-snug text-ink">&ldquo;{car.line}&rdquo;</p>

          <h3 className="latin font-display mt-3 text-[1.4rem] leading-tight text-ink">
            {car.marque} {car.model} <span className="text-ink-3">· {car.year}</span>
          </h3>
          {car.billing ? <p className="fine mt-1 text-ink-2">{car.billing}</p> : null}

          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-ink/10 pt-4">
            {fields.map((f) => (
              <div key={f.label}>
                <dt className="fine text-ink-3">{f.label}</dt>
                <dd className="tnum text-[0.94rem] text-ink">
                  <span className="latin">{f.value}</span>
                </dd>
              </div>
            ))}
          </dl>

          {car.factoryPaint ? (
            <p className="fine mt-4 border-t border-ink/10 pt-4 text-ink-2">
              <span className="text-ring">✓</span> {c.record.yes}
            </p>
          ) : null}

          <a
            href={car.postUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="fine mt-4 inline-block text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ring"
          >
            {c.record.viewPost}
          </a>
        </div>
      </div>
    </Said>
  );
}

function Record({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (i: number) => void;
}) {
  const c = useGoda();

  return (
    <section id="record" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <SectionHead eyebrow={c.record.eyebrow} heading={c.record.heading} intro={c.record.intro} />
      <div className="mt-14 space-y-16">
        {CARS.map((car, i) => (
          <RecordCard key={car.id} car={car} index={i} selected={i === selected} onSelect={() => setSelected(i)} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- teaser -- */

function Teaser() {
  const c = useGoda();

  return (
    <section className="border-y border-ink/10 bg-ground-2 py-24 sm:py-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Said>
            <div className="aspect-[4/3] w-full overflow-hidden bg-ground">
              <img
                src={TEASER.frame}
                alt={TEASER.line}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Said>

          <div>
            <Said className="label text-ring">{c.teaser.eyebrow}</Said>
            <Said as="h2" className="text-display font-display mt-3 max-w-[20ch] text-ink" delay={60}>
              {c.teaser.heading}
            </Said>
            <p dir="ltr" className="said mt-5 text-[1.05rem] text-ink">&ldquo;{TEASER.line}&rdquo;</p>
            <Said className="text-lead mt-5 max-w-[54ch] leading-[1.85] text-ink-2" delay={130}>
              {c.teaser.body}
            </Said>
            <a
              href={TEASER.postUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="fine mt-5 inline-block text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ring"
            >
              {c.teaser.viewPost}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- light -- */

function Light() {
  const c = useGoda();

  return (
    <section id="light" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Said className="label text-ring">{c.light.eyebrow}</Said>
          <Said as="h2" className="text-display font-display mt-3 max-w-[18ch] text-ink" delay={60}>
            {c.light.heading}
          </Said>
          <Rule className="mt-6" delay={110} />
          {c.light.body.map((p, i) => (
            <Said
              key={p.slice(0, 24)}
              className="text-lead mt-6 max-w-[52ch] leading-[1.85] text-ink-2"
              delay={160 + i * 90}
            >
              {p}
            </Said>
          ))}

          <Said className="mt-10 border-s-2 border-ring ps-4" delay={340}>
            <p className="fine font-medium text-ink">{c.repeat.heading}</p>
            <p className="fine mt-1.5 text-ink-2">{c.repeat.body}</p>
          </Said>
        </div>

        <Said delay={100} className="overflow-hidden bg-ground-2">
          <img
            src="/media/sl55-2.jpg"
            alt={c.light.heading}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </Said>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- contact -- */

function Contact() {
  const c = useGoda();

  return (
    <section id="contact" className="border-t border-ink/10 bg-ink py-24 text-ground sm:py-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Said as="h2" className="text-display font-display max-w-[16ch]">
          {c.contact.heading}
        </Said>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Said delay={60}>
            <div className="label text-glow">{c.contact.addressLabel}</div>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-ground/85">{c.contact.address}</p>
            <a
              href={c.contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="fine mt-3 inline-block text-ground underline decoration-ground/40 underline-offset-4"
            >
              Google Maps
            </a>
          </Said>

          <Said delay={130}>
            <div className="label text-glow">{c.contact.phoneLabel}</div>
            <ul className="mt-3 space-y-2">
              {c.contact.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:+2${p.replace(/\s/g, "")}`}
                    className="latin tnum text-[0.94rem] text-ground transition-opacity hover:opacity-75"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </Said>

          <Said delay={200}>
            <div className="label text-glow">{c.brand.name}</div>
            <div className="mt-3 flex flex-col gap-2 text-[0.9rem]">
              <a
                href={c.contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ground/85 underline decoration-ground/30 underline-offset-4 transition-colors hover:text-ground"
              >
                Instagram
              </a>
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ground/85 underline decoration-ground/30 underline-offset-4 transition-colors hover:text-ground"
              >
                Facebook
              </a>
            </div>
          </Said>

          <Said delay={270}>
            <a
              href={PROFILE.phoneHref}
              className="inline-block bg-glow px-6 py-3 text-[0.9rem] font-medium text-ink transition-opacity hover:opacity-85"
            >
              {c.contact.cta}
            </a>
          </Said>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- export -- */

export function Sections() {
  // The ring in the hero and the record list below share one selection.
  const [selected, setSelected] = useState(0);

  return (
    <main>
      <Hero selected={selected} />
      <Record selected={selected} setSelected={setSelected} />
      <Teaser />
      <Light />
      <Contact />
    </main>
  );
}

export function Footer() {
  const c = useGoda();

  return (
    <footer className="border-t border-ink/10 bg-ground py-10">
      <div className="mx-auto flex max-w-[86rem] flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/mark.svg" alt="" className="h-6 w-6" />
          <span className="font-display text-[0.92rem] font-semibold text-ink">{c.brand.name}</span>
        </div>
        <p className="fine max-w-[64ch] text-ink-2">{c.footer.disclaimer}</p>
        <p className="fine text-ink-2">{c.footer.rights}</p>
      </div>
    </footer>
  );
}
