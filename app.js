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
    relationshipConsole.querySelectorAll(".relationship-console__progress i").forEach((item, itemIndex) => {
      item.classList.toggle("is-complete", itemIndex <= index);
    });
  };

  if (relationshipSteps.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setRelationshipStep(Number(visible.target.dataset.relationshipStep || 0));
    }, { rootMargin: "-28% 0px -48%", threshold: [0.15, 0.35, 0.65] });
    relationshipSteps.forEach((step) => observer.observe(step));
  }

  const profileData = [
    ["Личное", "/pager-investor/ledger/profile-1.png", "Близкий круг"],
    ["Работа", "/pager-investor/ledger/profile-2.png", "Профессиональный контекст"],
    ["Гостевое", "/pager-investor/ledger/profile-3.png", "Временное общение"],
    ["Другое", "/pager-investor/ledger/profile-4.png", "Отдельный круг"],
  ];
  const profileButtons = [...document.querySelectorAll(".access-lab__profiles button")];
  const previewImage = document.querySelector(".access-lab__identity img");
  const previewContext = document.querySelector(".access-lab__identity span");
  const previewName = document.querySelector(".access-lab__identity strong");

  profileButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const profile = profileData[index];
      profileButtons.forEach((item, itemIndex) => {
        const active = itemIndex === index;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      if (previewImage) {
        previewImage.src = profile[1];
        previewImage.alt = `Профиль «${profile[0]}»`;
      }
      if (previewContext) previewContext.textContent = profile[2];
      if (previewName) previewName.textContent = profile[0];
    });
  });

  const permissionButtons = [...document.querySelectorAll(".access-lab__toggles button")];
  const permissionResults = [...document.querySelectorAll(".access-lab__result b")];
  permissionButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const next = button.getAttribute("aria-checked") !== "true";
      button.setAttribute("aria-checked", String(next));
      const result = permissionResults[index];
      if (result) {
        result.classList.toggle("is-open", next);
        result.textContent = next ? "Разрешено" : "Закрыто";
      }
    });
  });

  const durationButtons = [...document.querySelectorAll(".access-lab__duration button")];
  const durationResult = document.querySelector(".access-lab__expires b");
  durationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      durationButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      if (durationResult) durationResult.textContent = button.textContent.trim();
    });
  });

  const actStarts = [...document.querySelectorAll("[data-act]")];
  const actItems = [...document.querySelectorAll(".act-progress li")];
  const actCounter = document.querySelector(".act-progress__current b");
  const actLabel = document.querySelector(".act-progress small");
  const actLabels = [
    "Манифест PAGER", "Эволюция цифрового общения", "Новая единица продукта", "Механика отношения", "PAGER ID", "Контекстная видимость", "Персональные правила", "Продукт сегодня", "Бизнес-модель", "Путь развития",
  ];
  let frame = 0;
  const updateAct = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const readingLine = window.scrollY + window.innerHeight * 0.24;
      const activeIndex = actStarts.reduce((latest, section) => section.offsetTop > readingLine ? latest : Number(section.dataset.act || 1) - 1, 0);
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
