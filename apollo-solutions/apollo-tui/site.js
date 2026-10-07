(() => {
  const languageButton = document.getElementById("langBtn");
  const image = document.getElementById("workspaceImage");
  const dialogImage = document.getElementById("dialogImage");
  const dialog = document.getElementById("screenshotDialog");
  let language =
    new URLSearchParams(location.search).get("lang") === "sl" ? "sl" : "en";
  let theme = "dark";
  function updateScreenshot() {
    const source = `images/apollo-${theme}.png`;
    const alt =
      language === "sl"
        ? "Dejanski posnetek Apollo TUI 1.0.0 v iTermu: branje projektnih datotek in navodila za namestitev"
        : "Actual screenshot of Apollo TUI 1.0.0 in iTerm, showing project file reads and setup instructions";
    image.src = source;
    dialogImage.src = source;
    image.alt = alt;
    dialogImage.alt = alt;
    document
      .querySelectorAll("[data-theme]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.theme === theme),
        ),
      );
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next;
    document.querySelectorAll("[data-en][data-sl]").forEach((element) => {
      element.textContent = element.dataset[next];
    });
    languageButton.textContent = next === "en" ? "SL" : "EN";
    languageButton.setAttribute(
      "aria-label",
      next === "en" ? "Switch to Slovenian" : "Switch to English",
    );
    document.title =
      next === "sl"
        ? "Apollo TUI — razvoj z AI v terminalu | Apollo Solutions"
        : "Apollo TUI — AI development in your terminal | Apollo Solutions";
    document
      .querySelector("nav")
      .setAttribute(
        "aria-label",
        next === "sl" ? "Navigacija po izdelku" : "Product navigation",
      );
    document
      .getElementById("expandScreen")
      .setAttribute(
        "aria-label",
        next === "sl" ? "Povečaj posnetek Apollo" : "Enlarge Apollo screenshot",
      );
    document
      .getElementById("closeDialog")
      .setAttribute(
        "aria-label",
        next === "sl" ? "Zapri posnetek" : "Close screenshot",
      );
    document
      .getElementById("copyCommand")
      .setAttribute(
        "aria-label",
        next === "sl" ? "Kopiraj ukaz za zagon" : "Copy launch command",
      );
    document.querySelectorAll(".home-link").forEach((link) => {
      link.href =
        (next === "sl" ? "../sl/" : "../") +
        (link.classList.contains("quiet-link") ? "#apollo-products" : "");
    });
    updateScreenshot();
  }
  languageButton.addEventListener("click", () => {
    const next = language === "en" ? "sl" : "en";
    const url = new URL(location.href);
    url.searchParams.set("lang", next);
    history.replaceState(null, "", url);
    setLanguage(next);
  });
  document.querySelectorAll("[data-theme]").forEach((button) =>
    button.addEventListener("click", () => {
      theme = button.dataset.theme;
      updateScreenshot();
    }),
  );
  document
    .getElementById("expandScreen")
    .addEventListener("click", () => dialog.showModal());
  document
    .getElementById("closeDialog")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.getElementById("copyCommand").addEventListener("click", async () => {
    const status = document.getElementById("copyStatus");
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText("apollo");
      status.textContent =
        language === "sl" ? "Ukaz je kopiran." : "Command copied.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById("launchCommand"));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent =
        language === "sl"
          ? "Ukaz je izbran za kopiranje."
          : "Command selected for copying.";
    }
  });
  setLanguage(language);
})();
