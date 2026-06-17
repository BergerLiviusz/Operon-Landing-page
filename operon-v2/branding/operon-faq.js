/**
 * Operon FAQ — Sui-style accordion (single open optional, keyboard accessible).
 */
(function initOperonFaq() {
  const ROOT_SEL = "[data-operon-faq]";

  function setOpen(item, open) {
    const head = item.querySelector(".operon-faq-dd__head");
    const body = item.querySelector(".operon-faq-dd__body");
    if (!head || !body) return;

    item.classList.toggle("is--open", open);
    head.setAttribute("aria-expanded", open ? "true" : "false");
    body.hidden = !open;
  }

  function bindFaq(root) {
    if (!root || root.dataset.operonFaqBound === "1") return;
    root.dataset.operonFaqBound = "1";

    const items = [...root.querySelectorAll("[data-operon-faq-item]")];

    items.forEach((item) => {
      const head = item.querySelector(".operon-faq-dd__head");
      if (!head) return;

      head.addEventListener("click", () => {
        const isOpen = item.classList.contains("is--open");
        items.forEach((other) => {
          if (other !== item) setOpen(other, false);
        });
        setOpen(item, !isOpen);
      });
    });
  }

  function init() {
    document.querySelectorAll(ROOT_SEL).forEach(bindFaq);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
