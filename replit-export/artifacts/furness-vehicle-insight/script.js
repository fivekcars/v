(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  const dialog = document.querySelector(".enquiry-dialog");
  const form = document.querySelector(".enquiry-form");
  const topicSelect = document.querySelector("#enquiry-topic");
  const result = document.querySelector(".draft-result");
  const output = document.querySelector(".draft-output");
  const copyFeedback = document.querySelector(".copy-feedback");

  const openDialog = (topic) => {
    if (topic && topicSelect) {
      const option = [...topicSelect.options].find((item) => item.textContent.trim() === topic);
      if (option) topicSelect.value = option.value;
    }
    result.hidden = true;
    copyFeedback.textContent = "";
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.body.classList.add("dialog-open");
    setTimeout(() => dialog.querySelector("select")?.focus(), 30);
  };
  const closeDialog = () => {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("dialog-open");
  };

  document.querySelectorAll("[data-open-enquiry]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (nav?.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuButton?.setAttribute("aria-expanded", "false");
      }
      openDialog();
    });
  });
  document.querySelectorAll("[data-enquiry]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const topic = trigger.dataset.enquiry;
      if (nav?.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuButton?.setAttribute("aria-expanded", "false");
      }
      openDialog(topic);
    });
  });

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav?.classList.toggle("is-open", !isOpen);
  });
  nav?.querySelectorAll("a").forEach((link) => {
    if (!link.hasAttribute("data-enquiry")) {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton?.setAttribute("aria-expanded", "false");
        menuButton?.setAttribute("aria-label", "Open navigation");
      });
    }
  });
  dialog.querySelector(".dialog-close")?.addEventListener("click", closeDialog);
  dialog.querySelector("[data-close-dialog]")?.addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const value = (field) => String(data.get(field) || "").trim();
    const lines = [
      "Furness Vehicle Insight — enquiry draft",
      "This is a locally generated draft. It has not been sent or stored.",
      "",
      `Enquiry topic: ${value("topic") || "Not specified"}`,
      `Vehicle make / model: ${value("vehicle") || "Not provided"}`,
      `Approximate year: ${value("year") || "Not provided"}`,
      `Vehicle location: ${value("location") || "Not provided"}`,
      "",
      "What I would like help understanding:",
      value("details") || "Not provided",
      "",
      "Please confirm whether this request is within scope, travel area and current availability before any booking."
    ];
    output.value = lines.join("\n");
    result.hidden = false;
    copyFeedback.textContent = "";
    result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    dialog.querySelector("[data-copy-draft]")?.focus();
  });

  dialog.querySelector("[data-copy-draft]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(output.value);
      copyFeedback.textContent = "Copied to clipboard.";
    } catch {
      output.focus();
      output.select();
      const copied = document.execCommand("copy");
      copyFeedback.textContent = copied ? "Copied to clipboard." : "Select the draft text and copy it.";
    }
  });
  dialog.querySelector("[data-download-draft]")?.addEventListener("click", () => {
    const blob = new Blob([output.value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "fvi-enquiry-draft.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    copyFeedback.textContent = "Draft downloaded to your device.";
  });

  document.querySelectorAll(".audience-row[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector("#services");
      target?.classList.add("service-highlight");
      setTimeout(() => target?.classList.remove("service-highlight"), 750);
    });
  });
})();
