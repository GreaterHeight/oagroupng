/* v4.27 — Leadership profile modal. Full editorial profile window; no image-only lightbox behavior. */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("leadership-profile-modal");
  if (!modal) return;

  const dialog = modal.querySelector(".leadership-profile-modal__dialog");
  const close = modal.querySelector("[data-leadership-close]");
  const image = modal.querySelector("[data-leadership-image]");
  const imageFrame = modal.querySelector(".leadership-profile-modal__portrait");
  const name = modal.querySelector("[data-leadership-name]");
  const role = modal.querySelector("[data-leadership-role]");
  const bio = modal.querySelector("[data-leadership-bio]");
  const contactLinks = modal.querySelector("[data-leadership-contact-links]");
  const additional = modal.querySelector("[data-leadership-additional]");
  const triggers = [...document.querySelectorAll("[data-leadership-open]")];
  if (!dialog || !close || !image || !imageFrame || !name || !role || !bio || !contactLinks || !triggers.length) return;

  // Only information actually supplied/approved is stored here. Missing fields are deliberately not invented.
  const profiles = {
    "olusola-adekanola": {
      name: "Olusola Adekanola (FCA, FNIT)",
      role: "Global Chairman",
      image: "/images/Otuba-Olusola-Adekanola.jpg",
      alt: "Olusola Adekanola, Global Chairman",
      bio: [
        "The ARGP, pioneered by OA & Co., was an innovation; a revolution that transformed revenue generation strategy of governments at the state level and radically boosted their revenue earnings from taxes, levies, fees and penalties in doubles, triples and even quadruples."
      ],
      contacts: [
        {type:"linkedin", href:"https://www.linkedin.com/in/juliusolugbade/", external:true},
        {type:"email", href:"mailto:Olusola.Adekanola@oagroupng.com", external:false},
        {type:"website", href:"https://www.oagroung.com", external:true}
      ]
    },
    "julius-olugbade": {
      name: "Dr. Julius Olugbade (PhD.)",
      role: "Managing Partner/CEO",
      image: "/images/Dr-Julius-Olugbde.jpg",
      alt: "Dr. Julius Olugbade, Managing Partner/CEO",
      bio: ["Dr. Julius Ade Olugbade is a multidisciplinary accounting, audit, finance, tax, risk and compliance professional with over 20 years of professional and academic experience. He has held senior and managerial roles across banking, real estate, technology, aviation, pharmaceuticals and finance, including Chief Financial Officer, Group Head of Audit, Internal Control and Compliance, Manager of Finance and Domestic Operations, and Manager of Internal Audit, Risk and Compliance.", "His expertise includes internal control, auditing and investigation, fraud detection, financial reporting, financial analysis, forecasting, treasury and investment management, risk assessment, compliance and management reporting. He has also lectured accounting at Afe Babalola University and other institutions, supervised research, and advised organisations. He holds a PhD, MPhil and MSc in Accounting, an MBA in Finance and Banking, and a BSc in Accounting."],
      contacts: [
        {type:"linkedin", href:"https://www.linkedin.com/in/juliusolugbade/", external:true},
        {type:"email", href:"mailto:julius.olugbade@oagroupng.com", external:false},
        {type:"website", href:"https://www.juliusolugbade.com", external:true}
      ]
    },
    "kehinde-oyeleke": {
      name: "Kehinde Oyeleke",
      role: "Executive Adviser",
      image: "/images/Kehinde-Oyeleke.jpg",
      alt: "Kehinde Oyeleke, Executive Adviser",
      bio: ["Kehinde Oyeleke began his career in Corporate Finance at Arthur Andersen, later specialising in Corporate Tax and Business Advisory before joining the Transaction Structuring Group of PricewaterhouseCoopers in New York. He subsequently served as Vice President/Principal at Capital Alliance and Executive Director for Corporate Finance/Financial Advisory Services at Asset & Resource Management Company Limited.", "In 2002, he founded Seedvest Group to advance financial inclusion for economically active micro-entrepreneurs in Nigeria. Kehinde is a New York-licensed Certified Public Accountant and Fellow of the Institute of Chartered Accountants of Nigeria. He holds a BSc from Obafemi Awolowo University and an MBA in Finance and Strategic Management from Wharton, and has completed management training at Harvard and Stanford."],
      contacts: [
        {type:"linkedin", href:"https://www.linkedin.com/in/ken-oyeleke-3736351a/", external:true},
        {type:"email", href:"mailto:info@oagroupng.com", external:false},
        {type:"website", href:"https://www.oagroung.com", external:true}
      ]
    }
  };

  let lastTrigger = null;
  let previousOverflow = "";
  let imageRequest = 0;

  function icon(type) {
    if (type === "linkedin") return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5.2 8.5H2V22h3.2V8.5zM3.6 2A1.9 1.9 0 1 0 3.6 5.8 1.9 1.9 0 0 0 3.6 2zM9 8.5H6V22h3.2v-7.1c0-1.9.36-3.8 2.76-3.8 2.37 0 2.4 2.25 2.4 3.92V22H18v-7.75c0-3.8-.82-6.72-5.28-6.72-2.14 0-3.57 1.18-4.16 2.3h-.04V8.5z"></path></svg>';
    if (type === "email") return '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m5 7 7 5 7-5"></path></svg>';
    return '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M3.5 12h17M12 3c2.4 2.55 3.6 5.55 3.6 9S14.4 18.45 12 21c-2.4-2.55-3.6-5.55-3.6-9S9.6 5.55 12 3z"></path></svg>';
  }

  function renderContacts(profile) {
    contactLinks.replaceChildren();
    const types = [
      {type:"linkedin", label:"LinkedIn"},
      {type:"email", label:"Email"},
      {type:"website", label:"Website"}
    ];
    const contacts = Array.isArray(profile.contacts) ? profile.contacts : [];
    types.forEach((base) => {
      const item = contacts.find((entry) => entry.type === base.type);
      if (item && item.href) {
        const a = document.createElement("a");
        a.className = "leadership-profile-modal__contact-link";
        a.href = item.href;
        a.target = item.external ? "_blank" : "_self";
        if (item.external) a.rel = "noopener noreferrer";
        a.setAttribute("aria-label", base.label + " — " + profile.name);
        a.title = base.label;
        a.innerHTML = icon(base.type);
        contactLinks.appendChild(a);
      } else {
        const button = document.createElement("span");
        button.className = "leadership-profile-modal__contact-link is-pending";
        button.setAttribute("aria-label", base.label + " details pending");
        button.title = base.label + " details to be supplied";
        button.setAttribute("aria-disabled", "true");
        button.innerHTML = icon(base.type);
        contactLinks.appendChild(button);
      }
    });
  }

  function render(profile) {
    name.textContent = profile.name;
    role.textContent = profile.role;
    bio.replaceChildren();
    profile.bio.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      bio.appendChild(p);
    });
    renderContacts(profile);
    if (additional) {
      additional.replaceChildren();
      additional.hidden = true;
    }

    const requestId = ++imageRequest;
    imageFrame.classList.remove("is-empty");
    image.alt = profile.alt;
    image.removeAttribute("src");
    requestAnimationFrame(() => {
      if (requestId === imageRequest) image.src = profile.image;
    });
  }

  image.addEventListener("error", () => {
    if (!image.getAttribute("src")) return;
    imageFrame.classList.add("is-empty");
    image.removeAttribute("src");
  });

  function open(trigger) {
    const profile = profiles[trigger.dataset.profileId];
    if (!profile) return;
    lastTrigger = trigger;
    render(profile);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.scrollTop = 0;
    close.focus();
  }

  function shut() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = previousOverflow;
    if (lastTrigger) lastTrigger.focus();
  }

  triggers.forEach((trigger) => trigger.addEventListener("click", () => open(trigger)));
  close.addEventListener("click", shut);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) shut();
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      shut();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...modal.querySelectorAll("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])")]
      .filter((el) => !el.hidden && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
});
