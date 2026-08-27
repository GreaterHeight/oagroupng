document.addEventListener("DOMContentLoaded", () => {
  const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll(".reveal").forEach(el => observer ? observer.observe(el) : el.classList.add("is-visible"));

  document.querySelectorAll(".accordion-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".accordion-item");
      const group = item.closest(".accordion");
      const open = item.classList.contains("is-open");
      group.querySelectorAll(".accordion-item.is-open").forEach(other => {
        other.classList.remove("is-open");
        const t = other.querySelector(".accordion-trigger");
        if (t) {
          t.setAttribute("aria-expanded", "false");
          const icon = t.querySelector("span:last-child");
          if (icon) icon.textContent = "+";
        }
      });
      if (!open) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        const icon = trigger.querySelector("span:last-child");
        if (icon) icon.textContent = "−";
      }
    });
    trigger.addEventListener("keydown", e => {
      const items = [...trigger.closest(".accordion").querySelectorAll(".accordion-trigger")];
      const i = items.indexOf(trigger);
      if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
  });

  document.querySelectorAll("[data-filter-group]").forEach(group => {
    const buttons = group.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll(`[data-filter-target="${group.dataset.filterGroup}"]`);
    const empty = document.querySelector(`[data-empty="${group.dataset.filterGroup}"]`);
    buttons.forEach(button => button.addEventListener("click", () => {
      buttons.forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      const filter = button.dataset.filter.toLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const match = filter === "all" || card.dataset.category.toLowerCase() === filter;
        card.hidden = !match;
        if (match) visible++;
      });
      if (empty) empty.style.display = visible ? "none" : "block";
    }));
  });

  // Static deployment-safe enquiry: opens the visitor's mail client with the completed enquiry.
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  if (form && status) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = new FormData(form);
      const subject = `OA Group enquiry — ${data.get("service") || "General Group Enquiry"}`;
      const body = [
        `Full Name: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `Company: ${data.get("company") || ""}`,
        `Service: ${data.get("service") || ""}`,
        "",
        "Message:",
        data.get("message") || ""
      ].join("\n");
      window.location.href = `mailto:info@oagroupng.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.hidden = false;
      status.textContent = "Your email client should now open with the enquiry prepared. If it does not, email info@oagroupng.com directly.";
    });
  }

  // Cookie consent and preferences.
  const cookie = document.querySelector("[data-cookie]");
  const accept = document.querySelector("[data-cookie-accept]");
  const decline = document.querySelector("[data-cookie-decline]");
  const modal = document.querySelector("[data-cookie-modal]");
  const openPrefs = document.querySelector("[data-cookie-preferences]");
  const closePrefs = document.querySelector("[data-cookie-close]");
  const savePrefs = document.querySelector("[data-cookie-save]");
  const key = "oa_cookie_consent";
  if (cookie && !localStorage.getItem(key)) cookie.classList.add("is-visible");
  [accept, decline].forEach(button => button?.addEventListener("click", () => {
    localStorage.setItem(key, button.dataset.cookieValue);
    cookie?.classList.remove("is-visible");
  }));
  openPrefs?.addEventListener("click", () => {
    if (modal) modal.hidden = false;
  });
  closePrefs?.addEventListener("click", () => { if (modal) modal.hidden = true; });
  savePrefs?.addEventListener("click", () => {
    const analytics = document.querySelector("[data-cookie-analytics]")?.checked;
    const marketing = document.querySelector("[data-cookie-marketing]")?.checked;
    localStorage.setItem(key, JSON.stringify({ necessary:true, analytics, marketing }));
    if (modal) modal.hidden = true;
    cookie?.classList.remove("is-visible");
  });

  const search = document.querySelector("[data-site-search]");
  if (search) {
    search.addEventListener("submit", event => {
      event.preventDefault();
      const q = new FormData(search).get("q")?.trim();
      if (q) window.location.href = "/blog/?q=" + encodeURIComponent(q);
    });
  }

  // Clearly identify not-yet-live entity destinations without blocking the link.
  document.querySelectorAll('[data-status="coming-soon"]').forEach(link => {
    link.addEventListener("click", event => {
      const ok = window.confirm(`${link.textContent.trim().replace("→","").trim()} is not yet live. Continue to the configured entity URL?`);
      if (!ok) event.preventDefault();
    });
  });
});
