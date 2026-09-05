
/* v4.4 — OA Group logo loading spinner / throbber */
(() => {
  "use strict";
  const hideLoader = () => {
    const loader = document.querySelector("[data-site-loader]");
    if (!loader || loader.classList.contains("is-hidden")) return;
    loader.classList.add("is-hidden");
    window.setTimeout(() => loader.remove(), 420);
  };

  if (document.readyState === "complete") {
    window.requestAnimationFrame(hideLoader);
  } else {
    window.addEventListener("load", hideLoader, { once: true });
  }

  // Safety valve: never trap a visitor behind the loader because one resource
  // is slow or fails. This is intentionally generous for mobile connections.
  window.setTimeout(hideLoader, 8000);
})();

/* v4.2 — CSP-safe placeholder-first image fallback */
(() => {
  "use strict";

  const isSiteImage = (img) => {
    if (!(img instanceof HTMLImageElement)) return false;
    const src = img.getAttribute("src") || "";
    return src.startsWith("/images/");
  };

  const markImageUnavailable = (img) => {
    if (!isSiteImage(img) || img.dataset.imageFallbackApplied === "true") return;

    // Header and loader logos are supplied brand assets, not content-image
    // frames. Never remove them through the generic placeholder mechanism.
    if (img.dataset.brandAsset === "true" || img.closest(".brand") || img.classList.contains("site-loader__logo")) return;

    img.dataset.imageFallbackApplied = "true";

    const frame = img.closest(".arch-frame");
    const media = img.closest(".modal__media");

    if (frame) {
      frame.classList.add("is-empty");
      const hero = frame.closest(".page-hero");
      if (hero) hero.classList.add("has-placeholder-image");
      img.remove();
      return;
    }

    if (media) {
      media.classList.add("is-empty");
      img.remove();
      return;
    }

    // Supplied brand assets and any future non-framed image should fail
    // silently rather than leaving a browser broken-image icon.
    img.remove();
  };

  // Capture the native error event so this also handles lazy-loaded images.
  document.addEventListener("error", (event) => {
    if (event.target instanceof HTMLImageElement) markImageUnavailable(event.target);
  }, true);

  // Deferred scripts can execute after an eager image has already failed.
  // Scan completed images once DOM parsing is complete to catch that case.
  const preparePlaceholderImages = () => {
    // Placeholder-first assets visibly occupy the image frame while the JPG
    // resolves. A successful load removes the state; a failed load converts
    // it to the permanent empty state.
    document.querySelectorAll('img[data-placeholder-image="true"]').forEach((img) => {
      const frame = img.closest(".arch-frame");
      if (!frame) return;

      if (img.complete && img.naturalWidth > 0) {
        frame.classList.remove("is-empty", "is-placeholder-pending");
        return;
      }

      frame.classList.add("is-placeholder-pending");
      const hero = frame.closest(".page-hero");
      if (hero) hero.classList.add("has-placeholder-image");

      if (img.dataset.placeholderListeners === "true") return;
      img.dataset.placeholderListeners = "true";

      img.addEventListener("load", () => {
        frame.classList.remove("is-placeholder-pending", "is-empty");
        if (hero) hero.classList.remove("has-placeholder-image");
      }, { once: true });

      img.addEventListener("error", () => {
        frame.classList.remove("is-placeholder-pending");
        if (hero) hero.classList.add("has-placeholder-image");
        markImageUnavailable(img);
      }, { once: true });
    });
  };

  const scanCompletedImages = () => {
    document.querySelectorAll('img[src^="/images/"]').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) markImageUnavailable(img);
    });
  };

  const rescanImages = () => {
    preparePlaceholderImages();
    scanCompletedImages();
    window.setTimeout(() => {
      preparePlaceholderImages();
      scanCompletedImages();
    }, 0);
    window.setTimeout(() => {
      preparePlaceholderImages();
      scanCompletedImages();
    }, 250);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rescanImages, { once: true });
  } else {
    rescanImages();
  }

  // A failed eager image can complete between DOM parsing and load. Scan again
  // after the complete page load so the placeholder is deterministic.
  window.addEventListener("load", scanCompletedImages, { once: true });
})();

document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header");
  const back=document.querySelector(".backtop");
  const cookie=document.querySelector(".cookie");
  const managePanel=cookie?.querySelector(".cookie__manage");
  const nonEssential=cookie?.querySelector("[data-nonessential-cookie]");
  const saveButton=cookie?.querySelector('[data-cookie="save"]');
  const storageAvailable=()=>{try{const key="__oa_storage_test";localStorage.setItem(key,"1");localStorage.removeItem(key);return true}catch{return false}};
  const hasStorage=storageAvailable();
  const getChoice=()=>hasStorage?localStorage.getItem("oaCookieChoice"):null;
  const setChoice=value=>{if(hasStorage)try{localStorage.setItem("oaCookieChoice",value)}catch{}};
  const reveal=()=>document.querySelectorAll(".reveal").forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight*.9)el.classList.add("is-visible")});
  const scroll=()=>{header?.classList.toggle("is-scrolled",window.scrollY>20);back?.classList.toggle("is-visible",window.scrollY>500);reveal()};
  window.addEventListener("scroll",scroll,{passive:true}); scroll();
  back?.addEventListener("click",()=>window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const href=a.getAttribute("href");if(!href||href==="#")return;const target=document.querySelector(href);if(target){e.preventDefault();target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})}}));
  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=String(new Date().getFullYear()));
  if(cookie&&!getChoice()){cookie.hidden=false;cookie.classList.add("is-visible")}
  const closeCookie=value=>{setChoice(value);if(cookie){cookie.hidden=true;cookie.classList.remove("is-visible");cookie.classList.remove("is-managing");managePanel?.setAttribute("hidden","");saveButton?.setAttribute("hidden","")}};
  document.querySelectorAll("[data-cookie]").forEach(button=>button.addEventListener("click",()=>{
    const action=button.dataset.cookie;
    if(action==="manage"){
      const isOpen=!managePanel?.hasAttribute("hidden");
      if(managePanel){if(isOpen)managePanel.setAttribute("hidden","");else managePanel.removeAttribute("hidden")}
      if(saveButton){if(isOpen)saveButton.setAttribute("hidden","");else saveButton.removeAttribute("hidden")}
      cookie?.classList.toggle("is-managing",!isOpen); return;
    }
    if(action==="accepted"){if(nonEssential)nonEssential.checked=true;closeCookie("accepted");return}
    if(action==="rejected"){if(nonEssential)nonEssential.checked=false;closeCookie("rejected");return}
    if(action==="save"){closeCookie(nonEssential?.checked?"accepted":"rejected")}
  }));
});


/* v4.15 — Home-page Solutions Matrix tabs
   The existing markup exposes aria-controls relationships between each tab
   and panel. This controller makes those controls interactive, updates ARIA
   state, and provides keyboard navigation without hardcoding panel content. */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".matrix").forEach(function (matrix) {
    const tabs = Array.from(matrix.querySelectorAll(".matrix__tab[data-solution-tab]"));
    const panels = Array.from(matrix.querySelectorAll(".matrix__panel[data-solution-panel]"));
    if (!tabs.length || !panels.length) return;

    const activate = function (tab, moveFocus) {
      const targetId = tab.getAttribute("aria-controls");
      const target = targetId ? matrix.querySelector("#" + CSS.escape(targetId)) : null;
      if (!target) return;

      tabs.forEach(function (item) {
        const selected = item === tab;
        item.setAttribute("aria-selected", selected ? "true" : "false");
        item.setAttribute("tabindex", selected ? "0" : "-1");
      });

      panels.forEach(function (panel) {
        const visible = panel === target;
        panel.hidden = !visible;
        panel.setAttribute("aria-hidden", visible ? "false" : "true");
      });

      if (moveFocus) tab.focus();
    };

    const initiallySelected =
      tabs.find(function (tab) {
        return tab.getAttribute("aria-selected") === "true";
      }) || tabs[0];

    activate(initiallySelected, false);

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
        if (!keys.includes(event.key)) return;

        event.preventDefault();

        let nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        activate(tabs[nextIndex], true);
      });
    });
  });
});

/* v3.7.3 — Insights article cards */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".insight-card").forEach(function (card) {
    var link = card.querySelector('a[href^="/insights/"]');
    if (!link) return;
    var href = link.getAttribute("href");
    if (!href) return;

    card.setAttribute("data-detail-link", href);
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", function (event) {
      if (event.target.closest("a, button, input, select, textarea")) return;
      window.location.href = href;
    });
    card.addEventListener("keydown", function (event) {
      if ((event.key === "Enter" || event.key === " ") &&
          !event.target.closest("a, button, input, select, textarea")) {
        event.preventDefault();
        window.location.href = href;
      }
    });
  });
});
