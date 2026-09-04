/* v4.25 — Leadership profile modal */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#leadership-profile-modal");
  if (!modal) return;

  const dialog = modal.querySelector(".leadership-modal__dialog");
  const close = modal.querySelector("[data-leadership-close]");
  const image = modal.querySelector("[data-leadership-image]");
  const imageFrame = modal.querySelector(".leadership-modal__portrait");
  const name = modal.querySelector("[data-leadership-name]");
  const role = modal.querySelector("[data-leadership-role]");
  const bio = modal.querySelector("[data-leadership-bio]");
  const contact = modal.querySelector("[data-leadership-contact]");
  const contactLinks = modal.querySelector("[data-leadership-contact-links]");
  const triggers = [...document.querySelectorAll("[data-leadership-open]")];
  if (!dialog || !close || !image || !imageFrame || !name || !role || !bio || !triggers.length) return;

  const profiles = {
    "olusola-adekanola": {
      name: "Olusola Adekanola (FCA, FNIT)",
      role: "Global Chairman",
      image: "/images/Otuba-Olusola-Adekanola.jpg",
      alt: "Olusola Adekanola, Global Chairman",
      bio: "The ARGP, pioneered by OA & Co., was an innovation; a revolution that transformed revenue generation strategy of governments at the state level and radically boosted their revenue earnings from taxes, levies, fees and penalties in doubles, triples and even quadruples."
    },
    "julius-olugbade": {
      name: "Dr. Julius Olugbade (PhD.)",
      role: "Managing Partner/CEO",
      image: "/images/Dr-Julius-Olugbde.jpg",
      alt: "Dr. Julius Olugbade, Managing Partner/CEO",
      bio: "Biography will be added when the approved profile details are provided."
    },
    "kehinde-oyeleke": {
      name: "Kehinde Oyeleke",
      role: "Managing Partner",
      image: "/images/Kehinde-Oyeleke.jpg",
      alt: "Kehinde Oyeleke, Managing Partner",
      bio: "Biography will be added when the approved profile details are provided."
    }
  };

  let lastTrigger = null;
  let previousOverflow = "";

  const setImage = (profile) => {
    imageFrame.classList.remove("is-empty");
    image.src = profile.image;
    image.alt = profile.alt;
  };

  image.addEventListener("error", () => {
    imageFrame.classList.add("is-empty");
    image.removeAttribute("src");
  });

  const open = (trigger) => {
    const profile = profiles[trigger.dataset.profileId];
    if (!profile) return;
    lastTrigger = trigger;
    name.textContent = profile.name;
    role.textContent = profile.role;
    bio.textContent = profile.bio;
    setImage(profile);
    if (contact) contact.hidden = true;
    if (contactLinks) contactLinks.replaceChildren();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.focus();
  };

  const shut = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = previousOverflow;
    if (lastTrigger) lastTrigger.focus();
  };

  triggers.forEach(trigger => trigger.addEventListener("click", () => open(trigger)));
  close.addEventListener("click", shut);
  modal.addEventListener("click", event => {
    if (event.target === modal) shut();
  });

  document.addEventListener("keydown", event => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      shut();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...modal.querySelectorAll("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])")].filter(el => !el.hidden && el.offsetParent !== null);
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
