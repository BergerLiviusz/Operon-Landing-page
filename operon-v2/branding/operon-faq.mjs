/** Sui Builder FAQ accordion — Operon ERP GYIK (light mode). */

const PLUS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" class="operon-faq-dd__plus dd-plus" aria-hidden="true"><rect class="operon-faq-dd__plus-bg" width="40" height="40"></rect><path class="operon-faq-dd__plus-v" d="M20 27V13" stroke-width="1.4"></path><path class="operon-faq-dd__plus-h" d="M13 20H27" stroke-width="1.4"></path></svg>`;

const FAQ_ITEMS = [
  {
    question: "Kinek ajánlott az Operon ERP?",
    answer:
      "Magyar kis- és középvállalkozásoknak, ahol a pénzügy, készlet, értékesítés vagy HR folyamatok szétszórt rendszerekben futnak. Ha egyetlen, moduláris platformon szeretné látni a vállalat működését, az Operon erre lett szabva.",
  },
  {
    question: "Mennyi ideig tart a bevezetés?",
    answer:
      "A moduláris felépítés miatt az indulás heteken belül elkezdhető — nem hónapokig tartó, teljes cserével járó projekt. A csapat méretétől és az aktivált moduloktól függően együtt tervezzük meg a bevezetési ütemtervet.",
  },
  {
    question: "Milyen modulok érhetők el?",
    cards: [
      {
        title: "Pénzügy és számvitel",
        text: "Könyvelés, kontrolling és riportok egy közös adatbázisból.",
      },
      {
        title: "Beszerzés és készlet",
        text: "Valós idejű láthatóság a beszerzési láncban és a raktárakban.",
      },
      {
        title: "HR, értékesítés, gyártás",
        text: "Csak azokat a modulokat aktiválja, amire a vállalatnak szüksége van.",
      },
    ],
  },
  {
    question: "Kompatibilis a magyar szabályozással és a NAV-val?",
    answer:
      "Igen. Az Operon magyar kkv-kra lett optimalizálva: NAV-kompatibilis folyamatokkal, helyi szabályozásra szabott működéssel és magyar nyelvű támogatással.",
  },
  {
    question: "Felhőalapú vagy helyi telepítésű?",
    answer:
      "Az Operon felhőalapon fut, skálázható infrastruktúrával és kiszámítható költségekkel. Így nincs szükség saját szerverparkra, és a rendszer a vállalattal együtt növekszik.",
  },
  {
    question: "Hogyan kapok támogatást?",
    cards: [
      {
        title: "Bevezetési csapat",
        text: "Segítünk a modulok kiválasztásában, beállításában és az induló képzésben.",
      },
      {
        title: "Dokumentáció és útmutatók",
        text: "Részletes anyagok a mindennapi folyamatokhoz és adminisztrációhoz.",
      },
      {
        title: "Demó és konzultáció",
        text: "Egyeztessen időpontot, és végigvezetjük a platformon — <a href=\"#demo\" class=\"operon-faq-link\">Lépjen kapcsolatba</a>.",
      },
    ],
  },
];

function faqCards(cards) {
  return `<div class="operon-faq-cards">${cards
    .map(
      (card) =>
        `<div class="operon-faq-card"><div class="operon-faq-card__head"><div class="operon-faq-dd__mark"></div><h3 class="operon-faq-card__title">${card.title}</h3></div><p class="operon-faq-card__text">${card.text}</p></div>`,
    )
    .join("")}</div>`;
}

function faqItem(item, index) {
  const body = item.cards
    ? faqCards(item.cards)
    : `<p class="operon-faq-dd__answer">${item.answer}</p>`;

  return `<div class="operon-faq-dd" data-operon-faq-item><button type="button" class="operon-faq-dd__head" aria-expanded="false" aria-controls="operon-faq-panel-${index}" id="operon-faq-trigger-${index}"><div class="operon-faq-dd__mark" aria-hidden="true"></div><h2 class="operon-faq-dd__title">${item.question}</h2>${PLUS_ICON}</button><div class="operon-faq-dd__body" id="operon-faq-panel-${index}" role="region" aria-labelledby="operon-faq-trigger-${index}" hidden><div class="operon-faq-dd__body-inner">${body}</div></div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 2" fill="none" preserveAspectRatio="none" class="operon-faq-dd__rule" aria-hidden="true"><path d="M0 1L1440 0.999878" stroke="currentColor" stroke-width="2" stroke-dasharray="2 8" vector-effect="non-scaling-stroke"></path></svg></div>`;
}

export function buildOperonFaqHtml() {
  const items = FAQ_ITEMS.map(faqItem).join("");

  return `<section class="operon-faq-hero" id="faq" aria-labelledby="operon-faq-title"><div class="padding-global"><div class="w-layout-blockcontainer container-1400 w-container"><div class="operon-faq-hero__layout"><div class="operon-faq-hero__copy"><span class="operon-faq-hero__eyebrow">GYIK</span><h2 id="operon-faq-title" class="operon-faq-hero__title" global="revealElements">Gyakran ismételt kérdések</h2><p class="operon-faq-hero__lede">Kérdése van az Operon ERP-ről? Itt összegyűjtöttük a leggyakoribb válaszokat magyar kkv-k számára — modulok, bevezetés, támogatás.</p></div><div class="operon-faq-hero__pattern" aria-hidden="true"></div></div></div></div></section><section class="operon-faq-main" data-operon-faq><div class="padding-global"><div class="w-layout-blockcontainer container-1400 w-container"><div class="operon-faq-main__list">${items}</div></div></div></section>`;
}
