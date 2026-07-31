(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");

  const setMenuOpen = (open) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-is-open", open);
  };

  menuButton?.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  const relationshipStates = [
    ["PAGER ID", "Найти человека", "по PAGER ID, без раскрытия номера телефона."],
    ["Запрос", "Отправить запрос", "общение начинается только после подтверждения."],
    ["Профиль", "Выбрать профиль", "определить, какое имя, фотографию и описание увидит контакт."],
    ["Правила", "Настроить правила", "выбрать доступные способы взаимодействия."],
    ["Отношение", "Начать общение", "у отношения появляются собственные условия."],
  ];

  const relationshipSteps = [...document.querySelectorAll("[data-relationship-step]")];
  const relationshipConsole = document.querySelector(".relationship-console");

  const setRelationshipStep = (index) => {
    const state = relationshipStates[index];
    if (!state || !relationshipConsole) return;

    relationshipSteps.forEach((step, stepIndex) => {
      step.classList.toggle("is-active", stepIndex === index);
    });

    relationshipConsole.style.setProperty("--relationship-progress", String(index + 1));
    const counter = relationshipConsole.querySelector(".relationship-console__top b");
    const label = relationshipConsole.querySelector(".relationship-console__identity > div:last-child > span");
    const title = relationshipConsole.querySelector(".relationship-console__identity strong");
    const copy = relationshipConsole.querySelector(":scope > p");
    if (counter) counter.textContent = `0${index + 1} / 05`;
    if (label) label.textContent = state[0];
    if (title) title.textContent = state[1];
    if (copy) copy.textContent = state[2];

    relationshipConsole
      .querySelectorAll(".relationship-console__progress i")
      .forEach((item, itemIndex) => item.classList.toggle("is-complete", itemIndex <= index));
  };

  if (relationshipSteps.length && "IntersectionObserver" in window) {
    const relationshipObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setRelationshipStep(Number(visible.target.dataset.relationshipStep || 0));
      },
      { rootMargin: "-28% 0px -48%", threshold: [0.15, 0.35, 0.65] },
    );
    relationshipSteps.forEach((step) => relationshipObserver.observe(step));
  }

  const actStarts = [...document.querySelectorAll("[data-act]")];
  const actItems = [...document.querySelectorAll(".act-progress li")];
  const actCounter = document.querySelector(".act-progress__current b");
  const actLabel = document.querySelector(".act-progress small");
  const actLabels = [
    "Манифест PAGER",
    "Эволюция цифрового общения",
    "Новая единица продукта",
    "Контекстная видимость",
    "Один принцип",
    "Продукт сегодня",
    "Путь развития",
  ];
  let frame = 0;

  const updateAct = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const readingLine = window.scrollY + window.innerHeight * 0.24;
      const activeIndex = actStarts.reduce((latest, section) => {
        if (section.offsetTop > readingLine) return latest;
        return Number(section.dataset.act || 1) - 1;
      }, 0);

      actItems.forEach((item, index) => {
        const active = index === activeIndex;
        item.classList.toggle("is-active", active);
        const link = item.querySelector("a");
        if (active) link?.setAttribute("aria-current", "step");
        else link?.removeAttribute("aria-current");
      });
      if (actCounter) actCounter.textContent = String(activeIndex + 1).padStart(2, "0");
      if (actLabel) actLabel.textContent = actLabels[activeIndex] || actLabels[0];
    });
  };

  updateAct();
  window.addEventListener("scroll", updateAct, { passive: true });
  window.addEventListener("resize", updateAct);
})();
