
/* v4.40 — load web fonts without blocking first paint. */
(() => {
  "use strict";
  const href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Crimson+Pro:wght@300;400;500;600&display=swap";
  if (document.querySelector(`link[data-oa-fonts]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.oaFonts = "true";
  document.head.appendChild(link);
})();

/* v4.4 — OA Group logo loading spinner / throbber */
(() => {
  "use strict";
  const hideLoader = () => {
    const loader = document.querySelector("[data-site-loader]");
    if (!loader || loader.classList.contains("is-hidden")) return;
    loader.classList.add("is-hidden");
    window.setTimeout(() => loader.remove(), 420);
  };

  // Do not make the first paint wait for fonts, images, or the hero video.
  // The loader is only an initial paint guard, not a full-resource gate.
  const revealWhenReady = () => window.requestAnimationFrame(() => window.requestAnimationFrame(hideLoader));
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revealWhenReady, { once: true });
  } else {
    revealWhenReady();
  }

  // Safety valve: never trap a visitor behind the loader.
  window.setTimeout(hideLoader, 1800);
})();

/* v4.43 — image fallback only: real images render immediately.
   Governing rule:
   - If the declared image exists, show the real image; never show a placeholder first.
   - Only a genuine load failure gets the .is-empty placeholder state.
   - No "pending" state is used and no valid image is hidden while loading. */
(() => {
  "use strict";

  const isSiteImage = (img) => {
    if (!(img instanceof HTMLImageElement)) return false;
    const src = img.getAttribute("src") || "";
    return src.startsWith("/images/");
  };

  const markImageUnavailable = (img) => {
    if (!isSiteImage(img) || img.dataset.imageFallbackApplied === "true") return;

    // Brand assets are never converted into content placeholders.
    if (
      img.dataset.brandAsset === "true" ||
      img.closest(".brand") ||
      img.classList.contains("site-loader__logo")
    ) return;

    img.dataset.imageFallbackApplied = "true";

    const frame = img.closest(".arch-frame");
    const media = img.closest(".modal__media");

    if (frame) {
      frame.classList.add("is-empty");
      frame.classList.remove("is-placeholder-pending");
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

    // Non-framed content images fail silently rather than showing a broken icon.
    img.remove();
  };

  // Capture native failures, including lazy-loaded images.
  document.addEventListener("error", (event) => {
    if (event.target instanceof HTMLImageElement) {
      markImageUnavailable(event.target);
    }
  }, true);

  // This catches an eager image that failed before the listener was attached.
  const scanCompletedImages = () => {
    document.querySelectorAll('img[src^="/images/"]').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) {
        markImageUnavailable(img);
      }
    });
  };

  const init = () => {
    // Do NOT add a pending/placeholder state here.
    // Existing images must remain visible while the browser loads them.
    scanCompletedImages();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

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
