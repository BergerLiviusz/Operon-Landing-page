import Image from "next/image";
import {
  IconBuildingFactory2,
  IconCashBanknote,
  IconChartDots,
  IconChartPie,
  IconCloudLock,
  IconComponents,
  IconDatabase,
  IconHierarchy3,
  IconLifebuoy,
  IconMapSearch,
  IconProgressCheck,
  IconRoute,
  IconSettingsAutomation,
  IconTopologyStar,
  IconTruckDelivery,
  IconUserCog,
  type Icon,
} from "@tabler/icons-react";
import OperonHeroAsciiOne from "@/components/ui/hero-ascii-one";
import OperonInteractions from "./operon-interactions";

const navItems = [
  ["Platform", "platform"],
  ["Modulok", "modules"],
  ["Biztonság", "security"],
  ["Bevezetés", "support"],
  ["Demo", "demo"],
] as const;

const proofMarks = [
  "ALFA Industry",
  "Borsod Retail",
  "Duna Projekt",
  "Fókusz Trade",
  "Kapos Műhely",
  "Nord Logistic",
  "Tisza Service",
  "Vektor HR",
];

const principles = [
  {
    title: "Egységes működés",
    text: "Pénzügy, készlet, értékesítés, gyártás, projektek és HR egy közös adatmodellben dolgozik.",
    meta: "01 / platform",
    Icon: IconDatabase,
  },
  {
    title: "Modulokra építve",
    text: "Csak azt vezeti be, amire most szüksége van, majd új modulokkal bővíti a rendszert.",
    meta: "02 / modularitás",
    Icon: IconComponents,
  },
  {
    title: "Adatból döntés",
    text: "Vezetői riportok, KPI-ok és elemzések adják vissza a cég valós működési ritmusát.",
    meta: "03 / riporting",
    Icon: IconChartDots,
  },
  {
    title: "Felhő alapú alap",
    text: "Stabil, biztonságos és skálázható SaaS infrastruktúra, amely nem kéri el a teljes IT figyelmet.",
    meta: "04 / üzemeltetés",
    Icon: IconCloudLock,
  },
  {
    title: "Szakértői kíséret",
    text: "Operon nem csak szoftver: feltárás, implementáció, betanítás és folyamatos tanácsadás.",
    meta: "05 / támogatás",
    Icon: IconLifebuoy,
  },
];

const modules = [
  {
    number: "01",
    eyebrow: "Pénzügy és számvitel",
    title: "Kontrolling-alapú pénzügyi mag",
    text: "Számlázás, bizonylatok, kötelezettségek, terv-tény követés és vezetői pénzügyi riportok.",
    Icon: IconCashBanknote,
  },
  {
    number: "02",
    eyebrow: "Beszerzés és készlet",
    title: "Mozgó készlet, tiszta folyamatok",
    text: "Beszerzési igények, raktárfolyamatok, készletszintek és beszállítói kontroll egy helyen.",
    Icon: IconTruckDelivery,
  },
  {
    number: "03",
    eyebrow: "Értékesítés és CRM",
    title: "Ügyfélkapcsolatból pipeline",
    text: "Ajánlatok, ügyfelek, értékesítési státuszok és visszamérhető csapatmunka.",
    Icon: IconChartPie,
  },
  {
    number: "04",
    eyebrow: "Gyártás és termelés",
    title: "Tervezhető kapacitás és anyagigény",
    text: "Gyártási utasítások, normák, munkafázisok és termelési állapotok követése.",
    Icon: IconBuildingFactory2,
  },
  {
    number: "05",
    eyebrow: "Projektmenedzsment",
    title: "Feladatok, költségek, határidők",
    text: "Projektstruktúrák, erőforrások, mérföldkövek és jövedelmezőség összekötve.",
    Icon: IconRoute,
  },
  {
    number: "06",
    eyebrow: "HR és erőforrások",
    title: "Csapatadatok üzleti kontextusban",
    text: "Munkavállalói adatok, kapacitás, jelenlét és szervezeti riportok támogatása.",
    Icon: IconUserCog,
  },
];

const benefits = [
  {
    title: "Vezetőknek",
    kicker: "Irányítás, nem adminisztráció",
    points: [
      "Valós idejű KPI-ok cégszintű döntésekhez",
      "Áttekinthető folyamatállapotok modulokon át",
      "Kevesebb adatsziget és kevesebb manuális egyeztetés",
      "Skálázható rendszer növekvő szervezeteknek",
    ],
  },
  {
    title: "Csapatoknak",
    kicker: "Kevesebb kerülés, gyorsabb munka",
    points: [
      "Intuitív felület alacsony tanulási görbével",
      "Szerepkör-alapú nézetek és tiszta feladatlogika",
      "Összekapcsolt ügyfél-, termék- és pénzügyi adatok",
      "Biztonságos felhő elérés irodából és terepről",
    ],
  },
];

const industries = [
  {
    title: "Kereskedelem",
    text: "Készlet, árlista, értékesítés és pénzügyi elszámolás egy folyamatban.",
    lines: ["Raktár", "CRM", "Számlázás"],
  },
  {
    title: "Gyártó cégek",
    text: "Anyagigény, kapacitás, termelési státusz és költségkövetés összehangolva.",
    lines: ["BOM", "Termelés", "Kontrolling"],
  },
  {
    title: "Szolgáltatók",
    text: "Ügyfélmunka, projektek, kapacitás és fedezet tiszta, mérhető rendszerben.",
    lines: ["Projekt", "Idő", "Riport"],
  },
  {
    title: "Növekvő kkv-k",
    text: "Modulonként bővülő vállalatirányítás, amely nem éri utol a cégen belüli komplexitást.",
    lines: ["Felhő", "Jogosultság", "Skála"],
  },
];

const process = [
  {
    step: "01",
    title: "Feltárás",
    text: "A jelenlegi folyamatok, adatok és szűk keresztmetszetek pontos feltérképezése.",
    Icon: IconMapSearch,
  },
  {
    step: "02",
    title: "Modulterv",
    text: "Bevezetési sorrend, jogosultságok, riportok és integrációs pontok meghatározása.",
    Icon: IconHierarchy3,
  },
  {
    step: "03",
    title: "Implementáció",
    text: "Konfiguráció, adatbetöltés, tesztelés és csapaton belüli betanítás.",
    Icon: IconSettingsAutomation,
  },
  {
    step: "04",
    title: "Támogatás",
    text: "Folyamatos finomhangolás, szakértői tanácsadás és új modulok bekapcsolása.",
    Icon: IconProgressCheck,
  },
];

const resources = [
  "ERP modultérkép",
  "Bevezetési workshop",
  "Folyamat audit",
  "Vezetői riport demo",
];

const iconStroke = 1.8;

function SystemIcon({
  icon: IconComponent,
  className,
}: {
  icon: Icon;
  className?: string;
}) {
  return (
    <span className={className}>
      <IconComponent aria-hidden="true" stroke={iconStroke} />
    </span>
  );
}

export default function Home() {
  return (
    <>
      <OperonInteractions />
      <div className="announcement">
        <span>Operon ERP bevezetési workshopok magyar kkv-knak</span>
        <a href="#demo">Időpontot kérek</a>
      </div>

      <header className="site-header" aria-label="Főoldal navigáció">
        <a className="brand" href="#top" aria-label="Operon főoldal">
          <Image
            src="/operon_logo_full_cropped.svg"
            alt="Operon"
            width={756}
            height={512}
            priority
          />
        </a>

        <nav aria-label="Oldal szekciók">
          {navItems.map(([label, id]) => (
            <a href={`#${id}`} data-nav-link={id} key={id}>
              <span>{label}</span>
              <i aria-hidden="true" />
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#demo">
          <span>Demo</span>
          <b aria-hidden="true">+</b>
        </a>
      </header>

      <main id="top">
        <OperonHeroAsciiOne />

        <section className="proof section-shell" aria-label="Cégtípusok">
          <p data-reveal>Magyar vállalatok komplex működéséhez tervezve</p>
          <div className="proof-grid" data-reveal>
            {proofMarks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </section>

        <section className="manifesto section-shell section-frame" id="platform">
          <div className="section-index" data-reveal>
            <span>01</span>
            <span>Operon platform</span>
          </div>
          <h2 data-reveal>
            A cég működése nem különálló táblázatokból áll. Az Operon egy
            közös rendszerbe rendezi a folyamatokat, hogy a munka
            <em> látható</em>, a döntés <em>adatvezérelt</em>, a növekedés
            pedig <em>irányítható</em> legyen.
          </h2>
        </section>

        <section className="principles section-shell">
          <div className="principles-head" data-reveal>
            <a href="#modules" aria-label="Ugrás a modulokhoz">→</a>
            <p>Operon az</p>
          </div>
          <div className="principle-list">
            {principles.map((item) => (
              <article className="principle-row" data-reveal key={item.title}>
                <SystemIcon icon={item.Icon} className="principle-icon" />
                <div>
                  <small>{item.meta}</small>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stack section-shell section-frame" id="modules">
          <div className="stack-intro" data-reveal>
            <div className="section-index">
              <span>02</span>
              <span>Moduláris stack</span>
            </div>
            <h2>Innováció, vállalatirányításra tervezve.</h2>
            <p>
              Az Operon moduljai közös adatmaghoz kapcsolódnak, így minden
              üzleti terület saját munkafelületen dolgozik, de ugyanazt a valós
              céges képet látja.
            </p>
          </div>

          <div className="stack-map" data-reveal>
            <div className="stack-core">
              <SystemIcon icon={IconTopologyStar} className="stack-core-icon" />
              <span>Live ERP map</span>
            </div>
            {modules.map((module) => (
              <article className="module-card" key={module.number}>
                <div className="module-topline">
                  <span className="module-number">{module.number}</span>
                  <SystemIcon icon={module.Icon} className="module-icon" />
                </div>
                <small>{module.eyebrow}</small>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dual section-shell" id="security">
          <div className="dual-heading" data-reveal>
            <div className="section-index">
              <span>03</span>
              <span>Biztonságos felhő</span>
            </div>
            <h2>Két nézőpont, egy stabil rendszer.</h2>
          </div>
          <div className="dual-grid">
            {benefits.map((group) => (
              <article className="benefit-panel" data-reveal key={group.title}>
                <span>{group.kicker}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="industry section-shell">
          <div className="industry-head" data-reveal>
            <div className="section-index">
              <span>04</span>
              <span>Felhasználási minták</span>
            </div>
            <h2>Iparagi ritmusok, egy Operon logika.</h2>
            <p>
              A platform nem egyetlen sablonra erőlteti rá a céget. A modulok
              összetétele és sorrendje igazodik a működési modellhez.
            </p>
          </div>
          <div className="industry-grid">
            {industries.map((industry) => (
              <article className="industry-card" data-reveal key={industry.title}>
                <div className="card-corner" aria-hidden="true" />
                <h3>{industry.title}</h3>
                <p>{industry.text}</p>
                <div>
                  {industry.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section-shell section-frame" id="support">
          <div className="process-head" data-reveal>
            <div className="section-index">
              <span>05</span>
              <span>Bevezetési rendszer</span>
            </div>
            <h2>Nem csak telepítés. Vezetett átállás.</h2>
          </div>
          <div className="process-track">
            {process.map((item) => (
              <article className="process-step" data-reveal key={item.step}>
                <div className="process-step-head">
                  <span>{item.step}</span>
                  <SystemIcon icon={item.Icon} className="process-icon" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resources section-shell" id="demo">
          <div className="resources-copy" data-reveal>
            <div className="section-index">
              <span>06</span>
              <span>Kezdés</span>
            </div>
            <h2>Kezdje egy személyre szabott Operon bemutatóval.</h2>
            <p>
              Mutassa meg, hol akad el a jelenlegi működés, mi pedig
              összerakjuk, milyen modularchitektúra adja a legtöbb üzleti
              hasznot.
            </p>
            <a className="primary-action inverted" href="mailto:hello@operon.hu">
              <span>Demo egyeztetése</span>
              <i aria-hidden="true">→</i>
            </a>
          </div>
          <div className="resource-grid" data-reveal>
            {resources.map((resource, index) => (
              <a href="mailto:hello@operon.hu" key={resource}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{resource}</strong>
                <i aria-hidden="true">→</i>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <div className="footer-brand">
            <Image
              src="/operon_logo_full_cropped.svg"
              alt="Operon"
              width={756}
              height={512}
            />
            <p>
              Modulalapú ERP platform magyar kkv-knak, ahol a napi működés,
              riporting és növekedés egy rendszerben találkozik.
            </p>
          </div>
          <div>
            <h4>Platform</h4>
            <a href="#platform">Integrált működés</a>
            <a href="#modules">Moduláris stack</a>
            <a href="#security">Felhő és biztonság</a>
          </div>
          <div>
            <h4>Modulok</h4>
            <a href="#modules">Pénzügy</a>
            <a href="#modules">Készlet</a>
            <a href="#modules">CRM</a>
            <a href="#modules">Gyártás</a>
          </div>
          <div>
            <h4>Bevezetés</h4>
            <a href="#support">Feltárás</a>
            <a href="#support">Modulterv</a>
            <a href="#support">Támogatás</a>
          </div>
          <div>
            <h4>Kapcsolat</h4>
            <a href="mailto:hello@operon.hu">hello@operon.hu</a>
            <a href="#demo">Demo időpont</a>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          <span>© 2026 Operon ERP</span>
          <span>Premium enterprise system for Hungarian SMBs</span>
        </div>
      </footer>
    </>
  );
}
