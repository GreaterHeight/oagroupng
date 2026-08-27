document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobile = document.querySelector("[data-mobile-menu]");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
  }

  document.querySelectorAll("[data-dropdown-trigger]").forEach(trigger => {
    const menu = trigger.nextElementSibling;
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = menu.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".dropdown.is-open").forEach(menu => {
      if (!menu.parentElement.contains(event.target)) {
        menu.classList.remove("is-open");
        const trigger = menu.previousElementSibling;
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      document.querySelectorAll(".dropdown.is-open").forEach(menu => menu.classList.remove("is-open"));
      if (mobile) mobile.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  });
});
