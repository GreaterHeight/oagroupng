/* v4.37 — Production form delivery via FormSubmit
 *
 * Static-site compatible mail delivery for Contact and Careers forms.
 * FormSubmit receives the submission and forwards it to info@oagroupng.com.
 * No mail client is opened by the browser.
 */
document.addEventListener("DOMContentLoaded", () => {
  const ENDPOINT = "https://formsubmit.co/ajax/info@oagroupng.com";
  const FALLBACK_ENDPOINT = "https://formsubmit.co/info@oagroupng.com";

  const routeMap = {
    "Accounting, Audit & Tax": "OA & Co",
    "Business Advisory & Consulting": "OA Consulting Limited",
    "Property & Real Estate": "Henrisol Properties",
    "Financing & Credit": "Maria Oyinlola Limited",
    "Contracting & Projects": "Pearl Primus",
    "Group Partnership or Institutional Enquiry": "OA Group Nigeria"
  };

  const setStatus = (form, message, type = "info") => {
    const status = form.parentElement?.querySelector("[data-form-status]");
    if (!status) return;
    status.textContent = message;
    status.dataset.statusType = type;
    status.classList.add("is-visible");
  };

  const setBusy = (form, busy) => {
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
    button.disabled = busy;
    button.setAttribute("aria-busy", busy ? "true" : "false");
    button.textContent = busy ? "Sending…" : button.dataset.originalText;
  };

  const validateFile = (form) => {
    const file = form.querySelector('input[type="file"]');
    if (!file?.files?.length) return true;
    const chosen = file.files[0];
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!allowed.includes(chosen.type)) {
      setStatus(form, "Please select a PDF, DOC or DOCX CV.", "error");
      return false;
    }
    if (chosen.size > 10 * 1024 * 1024) {
      setStatus(form, "The CV must be 10 MB or smaller.", "error");
      return false;
    }
    return true;
  };

  const prepareFields = (form, kind) => {
    const data = new FormData(form);
    const enquiry = data.get("enquiry") || "";
    const route = routeMap[enquiry] || "OA Group Nigeria";

    data.set("_subject", kind === "contact"
      ? `${data.get("subject") || "Contact Enquiry"} — ${route}`
      : `Career Application — ${data.get("role") || "General Enquiry"}`);
    data.set("_captcha", "true");
    data.set("_template", "table");
    data.set("_replyto", data.get("email") || "");
    data.set("_url", window.location.href);
    data.set("_form_type", kind === "contact" ? "OA Group Contact Enquiry" : "OA Group Career Application");
    if (kind === "contact") data.set("_routing_company", route);

    // Consent is retained as an auditable field rather than being silently discarded.
    if (data.has("consent")) data.set("consent", "Yes");
    return data;
  };

  const submitForm = async (form, kind) => {
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus(form, "Please correct the highlighted fields before submitting.", "error");
      return;
    }
    if (!validateFile(form)) return;

    setBusy(form, true);
    setStatus(form, "Sending your submission…", "loading");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: prepareFields(form, kind)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || `Submission failed (${response.status}).`);
      }

      setStatus(
        form,
        kind === "contact"
          ? "Thank you. Your enquiry has been received by OA Group. A member of our team will respond as soon as possible."
          : "Thank you. Your application has been received by OA Group. Our team will review your submission and contact you if appropriate.",
        "success"
      );
      form.reset();
      if (kind === "contact") {
        const subject = form.querySelector("#subject");
        if (subject) subject.value = "";
      }
    } catch (error) {
      console.error("OA Group form submission error:", error);
      setStatus(
        form,
        "We could not send your submission right now. Please try again in a moment or contact info@oagroupng.com.",
        "error"
      );
    } finally {
      setBusy(form, false);
    }
  };

  const wireForm = (form, kind) => {
    form.setAttribute("action", FALLBACK_ENDPOINT);
    form.setAttribute("method", "POST");
    if (kind === "career") form.setAttribute("enctype", "multipart/form-data");
    form.addEventListener("invalid", (event) => {
      const field = event.target.closest(".field");
      field?.classList.add("has-error");
    }, true);
    form.addEventListener("input", (event) => {
      event.target.closest(".field")?.classList.remove("has-error");
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(form, kind);
    });
  };

  const contact = document.querySelector('form[data-static-form="contact"]');
  const career = document.querySelector('form[data-static-form="career"]');

  if (contact) {
    const type = contact.querySelector("#enquiry");
    const subject = contact.querySelector("#subject");
    if (type && subject) {
      type.addEventListener("change", () => {
        subject.value = type.value
          ? `${type.value} — ${routeMap[type.value] || "OA Group Nigeria"}`
          : "";
      });
    }
    wireForm(contact, "contact");
  }

  if (career) wireForm(career, "career");
});

/* v4.37 — Newsletter subscription notification */
document.addEventListener("DOMContentLoaded", () => {
  const ENDPOINT = "https://formsubmit.co/ajax/info@oagroupng.com";
  document.querySelectorAll(".newsletter").forEach(form => {
    const input = form.querySelector('input[type="email"]');
    const consent = form.querySelector('input[name="newsletter-consent"]');
    const button = form.querySelector('button[type="submit"]');
    if (!input || !consent) return;

    const status = document.createElement("div");
    status.className = "form-status newsletter-status";
    status.setAttribute("role", "status");
    form.appendChild(status);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      const original = button.textContent;
      button.textContent = "Sending…";
      status.textContent = "Submitting your subscription…";
      status.classList.add("is-visible");

      const data = new FormData();
      data.set("email", input.value.trim());
      data.set("consent", "Yes");
      data.set("_subject", "OA Group Newsletter Subscription");
      data.set("_captcha", "true");
      data.set("_template", "table");
      data.set("_form_type", "OA Group Newsletter Subscription");
      data.set("_url", window.location.href);

      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: data
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === false) throw new Error(result.message || "Subscription failed");
        status.textContent = "Thank you. Your newsletter subscription request has been received.";
        status.dataset.statusType = "success";
        form.reset();
      } catch (error) {
        console.error("OA Group newsletter submission error:", error);
        status.textContent = "We could not process your subscription right now. Please try again later.";
        status.dataset.statusType = "error";
      } finally {
        button.disabled = false;
        button.setAttribute("aria-busy", "false");
        button.textContent = original;
      }
    });
  });
});
