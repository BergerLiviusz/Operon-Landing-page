import OperonInteractions from "./operon-interactions";

const modules = [
  {
    id: "01",
    title: "Pénzügy és számvitel",
    detail:
      "Főkönyv, vevői és szállítói analitika, bankkönyvelés, pénzforgalom-tervezés.",
  },
  {
    id: "02",
    title: "Beszerzés és készlet",
    detail:
      "Rendelések, készletmozgások, leltározás és vonalkódos folyamatok egy helyen.",
  },
  {
    id: "03",
    title: "Értékesítés és CRM",
    detail:
      "Ajánlatadás, szerződések, ügyfélkapcsolatok és értékesítési rendelések követése.",
  },
  {
    id: "04",
    title: "Gyártás és termelés",
    detail:
      "Művelettervezés, gyártási megbízások, kapacitástervezés és anyagkiadás.",
  },
  {
    id: "05",
    title: "Projektmenedzsment",
    detail:
      "Projekttervezés, erőforrás-allokáció, költségvetés és státuszriportok.",
  },
  {
    id: "06",
    title: "HR / emberi erőforrások",
    detail:
      "Munkavállalói adatok, szabadságkezelés, teljesítményértékelés és bérfolyamatok.",
  },
];

const advantages = [
  "Integrált platform szétszórt eszközök helyett",
  "Moduláris bevezetés a vállalat valódi igényeire szabva",
  "Modern, intuitív felület alacsony tanulási görbével",
  "Valós idejű riportok és adatvezérelt döntéstámogatás",
  "Biztonságos, skálázható, felhő alapú technológiai alap",
  "Szakértői tanácsadás és folyamatos támogatás",
];

const workflow = [
  {
    label: "Feltérképezés",
    copy: "Az üzleti folyamatokat és a kritikus adatkapcsolatokat közös workshopokon rendezzük rendszertervvé.",
  },
  {
    label: "Modulválasztás",
    copy: "Csak azok a funkciók kerülnek élesítésre, amelyek ténylegesen értéket teremtenek a csapatnak.",
  },
  {
    label: "Bevezetés",
    copy: "Konfiguráció, oktatás és éles indulási támogatás, hogy az ERP ne projekt, hanem működés legyen.",
  },
];

export default function Home() {
  return (
    <main>
      <OperonInteractions />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Operon kezdolap">
          <img src="/operon_symbol.png" alt="" />
          <span>operon</span>
        </a>
        <nav aria-label="Fo navigacio">
          <a href="#platform" data-nav-link="platform">
            Platform
          </a>
          <a href="#modules" data-nav-link="modules">
            Modulok
          </a>
          <a href="#security" data-nav-link="security">
            Biztonság
          </a>
          <a href="#support" data-nav-link="support">
            Támogatás
          </a>
        </nav>
        <a className="nav-cta" href="#demo" data-nav-link="demo">
          Demo igénylés
        </a>
      </header>

      <section className="hero section-shell" id="top" data-hero>
        <div className="hero-ambient" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">Operon ERP / magyar kkv-knek</p>
          <h1>Modern vállalatirányítási rendszer, amely egyben tartja a céget.</h1>
          <p className="hero-lede">
            Az Operon modulalapú ERP platform egyesíti a pénzügyet, készletet,
            értékesítést, gyártást, projekteket és HR folyamatokat egy modern,
            biztonságos felhő alapú rendszerben.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#demo">
              Személyre szabott demo
            </a>
            <a className="secondary-action" href="#modules">
              Modulok megtekintése
            </a>
          </div>
        </div>

        <div
          className="hero-product"
          aria-label="Operon ERP felulet elonezet"
          data-reveal
          data-hero-product
        >
          <div className="product-scanline" aria-hidden="true" />
          <div className="product-topline">
            <div>
              <span>Operon Core</span>
              <strong>Valós idejű vállalati állapot</strong>
            </div>
            <img src="/operon_symbol.png" alt="" />
          </div>
          <div className="product-grid">
            <div className="metric-card large">
              <span>Havi teljesítés</span>
              <strong>
                <span data-count="92" data-suffix="%">
                  92%
                </span>
              </strong>
              <div className="chart-bars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="metric-card accent">
              <span>Készletpontosság</span>
              <strong>
                <span data-count="98.4" data-decimals="1" data-suffix="%">
                  98.4%
                </span>
              </strong>
            </div>
            <div className="metric-card">
              <span>Nyitott projektek</span>
              <strong>
                <span data-count="24">24</span>
              </strong>
            </div>
            <div className="module-rail">
              <span data-module-label>Pénzügy</span>
              <span data-module-label>CRM</span>
              <span data-module-label>Gyártás</span>
              <span data-module-label>HR</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" data-reveal>
        <span>Integrált működés</span>
        <span>Moduláris skálázódás</span>
        <span>Felhő alapú biztonság</span>
        <span>Szakértői bevezetés</span>
      </section>

      <section className="editorial section-shell" id="platform" data-reveal>
        <div className="section-geometry geometry-editorial" aria-hidden="true" />
        <div>
          <p className="eyebrow">Miért Operon /</p>
          <h2>Nem újabb eszköz. Egy közös üzleti operációs réteg.</h2>
        </div>
        <p>
          Az Operon ERP megszünteti az adatszigeteket, és folyamatos
          információáramlást ad a vezetőknek és az operatív csapatoknak. A
          rendszer a magyar kkv-k valós működésére épül: elég rugalmas az
          egyedi folyamatokhoz, de elég strukturált a stabil növekedéshez.
        </p>
      </section>

      <section
        className="advantage-grid section-shell"
        aria-label="Operon elonyok"
        data-reveal
      >
        {advantages.map((item, index) => (
          <article key={item} data-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item}</h3>
          </article>
        ))}
      </section>

      <section className="modules section-shell" id="modules" data-reveal>
        <div className="section-geometry geometry-modules" aria-hidden="true" />
        <div className="section-heading">
          <p className="eyebrow">Moduláris ERP stack /</p>
          <h2>A funkciók a vállalat igényei szerint kapcsolhatók össze.</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <article key={module.id} className="module-card" data-reveal>
              <span>{module.id}</span>
              <h3>{module.title}</h3>
              <p>{module.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="system-band" id="security" data-reveal>
        <div className="system-matrix" aria-hidden="true" />
        <div className="section-shell system-layout">
          <div data-reveal>
            <p className="eyebrow">Technológia és biztonság /</p>
            <h2>Stabil felhő alapú alap, amelyre mérhető növekedés épülhet.</h2>
          </div>
          <div className="system-cards">
            <article data-reveal>
              <span>Adatbiztonság</span>
              <p>
                Titkosítás, hozzáférés-szabályozás és rendszeres biztonsági
                mentések védik az üzleti adatokat.
              </p>
            </article>
            <article data-reveal>
              <span>Riporting</span>
              <p>
                Testreszabható jelentések és valós idejű analitika segítik a
                gyors, adatvezérelt vezetői döntéseket.
              </p>
            </article>
            <article data-reveal>
              <span>Skálázhatóság</span>
              <p>
                A modulok és a felhő infrastruktúra a cég méretéhez és
                adatmennyiségéhez igazítható.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="workflow section-shell" id="support" data-reveal>
        <div className="section-geometry geometry-workflow" aria-hidden="true" />
        <div className="section-heading">
          <p className="eyebrow">Bevezetés /</p>
          <h2>Szoftver mellé szakértői irányítás is jár.</h2>
        </div>
        <div className="workflow-grid">
          <div className="workflow-connector" aria-hidden="true" />
          {workflow.map((step, index) => (
            <article key={step.label} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.label}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta section-shell" id="demo" data-reveal>
        <div className="cta-geometry" aria-hidden="true" />
        <div>
          <p className="eyebrow">Következő lépés /</p>
          <h2>Nézze meg, hogyan illeszkedik az Operon az Ön cégére.</h2>
        </div>
        <a className="primary-action dark" href="mailto:hello@operon.hu">
          Demo egyeztetése
        </a>
      </section>

      <footer data-reveal>
        <a className="brand footer-brand" href="#top" aria-label="Operon kezdolap">
          <img src="/operon_symbol.png" alt="" />
          <span>operon</span>
        </a>
        <span>Modulalapú ERP magyar kis- és középvállalatoknak.</span>
      </footer>
    </main>
  );
}
