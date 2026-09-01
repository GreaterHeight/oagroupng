document.addEventListener("DOMContentLoaded", () => {
  const buttons = [...document.querySelectorAll("[data-video]")];
  const modal = document.querySelector("[data-video-modal]");
  const dialog = modal?.querySelector(".modal__dialog");
  const close = modal?.querySelector("[data-video-close]");
  const title = modal?.querySelector("[data-video-title]");
  const body = modal?.querySelector("[data-video-body]");

  if (!buttons.length || !modal || !dialog || !close || !title || !body) return;

  const videos = [
    {
      title: "OA Group overview",
      text: "An institutional overview of OA Group Nigeria, its specialist companies and integrated solutions."
    },
    {
      title: "Inside the specialist companies",
      text: "A portfolio view of the specialist capabilities that make up OA Group Nigeria."
    },
    {
      title: "Projects and commercial capability",
      text: "An editorial view of project facilitation, contracting and commercial capability across the group."
    }
  ];

  let lastTrigger = null;

  const focusableElements = () => [close].filter(element => element && !element.disabled);

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastTrigger?.focus();
  };

  const openModal = index => {
    const media = videos[index] || videos[0];
    lastTrigger = buttons[index] || buttons[0];
    title.textContent = media.title;
    body.textContent = media.text;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    close.focus();
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => openModal(index));
  });

  close.addEventListener("click", closeModal);

  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key === "Tab") {
      const focusables = focusableElements();
      if (!focusables.length) return;
      event.preventDefault();
      focusables[0].focus();
    }
  });
});
