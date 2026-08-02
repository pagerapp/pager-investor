(() => {
  const menuButton = document.querySelector(".protocol-menu-button");
  const mobileMenu = document.querySelector("#protocol-menu");
  const setMenuOpen = (open) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-is-open", open);
  };
  menuButton?.addEventListener("click", () => setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true"));
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenuOpen(false); });

  const protocolStates = [
    ["PAGER ID", "A147 0865", "Публичный идентификатор"],
    ["ЗАПРОС", "Ожидает подтверждения", "Доступ ещё не открыт"],
    ["ПРОФИЛЬ", "Работа", "Профессиональный контекст"],
    ["РАЗРЕШЕНИЯ", "Текст · Файлы", "2 из 6 способов доступны"],
    ["СРОК", "24:00:00", "Временный доступ"],
  ];
  const storySteps = [...document.querySelectorAll("[data-protocol-step]")];
  const consoleBox = document.querySelector(".protocol-console");
  const setProtocolStep = (index) => {
    const state = protocolStates[index];
    if (!state || !consoleBox) return;
    storySteps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
    const counter = consoleBox.querySelector(".protocol-console__top b");
    const label = consoleBox.querySelector(".protocol-console__screen-label");
    const value = consoleBox.querySelector(".protocol-console__screen strong");
    const detail = consoleBox.querySelector(".protocol-console__screen p");
    if (counter) counter.textContent = `0${index + 1} / 05`;
    if (label) label.textContent = state[0];
    if (value) value.textContent = state[1];
    if (detail) detail.textContent = state[2];
    consoleBox.querySelectorAll(".protocol-console__ticks i").forEach((tick, tickIndex) => tick.classList.toggle("is-on", tickIndex <= index));
  };
  storySteps.forEach((step, index) => step.addEventListener("click", () => setProtocolStep(index)));
  if (storySteps.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setProtocolStep(Number(visible.target.dataset.protocolStep || 0));
    }, { rootMargin: "-25% 0px -55%", threshold: [0.15, 0.35, 0.65] });
    storySteps.forEach((step) => observer.observe(step));
  }

  const profiles = [
    ["Личное", "/pager-investor/protocol/profile-personal.png", "Близкий круг", "Евгений", "Евгений · личное описание", "Сообщения · Звонки · Файлы", "Постоянно"],
    ["Работа", "/pager-investor/protocol/profile-work.png", "Профессиональный контекст", "Е. Мартынов", "Е. Мартынов · рабочее описание", "Сообщения · Файлы", "Постоянно"],
    ["Гостевое", "/pager-investor/protocol/profile-guest.png", "Временный контекст", "Evgeny", "Evgeny · без личных деталей", "Сообщения", "24 часа"],
    ["Другое", "/pager-investor/protocol/profile-alter.png", "Отдельная версия личности", "E. M.", "E. M. · отдельное описание", "По запросу", "7 дней"],
  ];
  const profileTabs = [...document.querySelectorAll(".profile-switcher__tab")];
  const profileImage = document.querySelector(".profile-view__image img");
  const profileContext = document.querySelector(".profile-view__copy .protocol-kicker");
  const profileName = document.querySelector(".profile-view__copy h3");
  const profileRows = [...document.querySelectorAll(".profile-view__rows b")];
  const setProfile = (index) => {
    const profile = profiles[index];
    if (!profile) return;
    profileTabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    if (profileImage) { profileImage.src = profile[1]; profileImage.alt = `${profile[0]}: ${profile[3]}`; }
    if (profileContext) profileContext.textContent = profile[2];
    if (profileName) profileName.textContent = profile[3];
    if (profileRows[0]) profileRows[0].textContent = profile[4];
    if (profileRows[1]) profileRows[1].textContent = profile[5];
    if (profileRows[2]) profileRows[2].textContent = profile[6];
  };
  profileTabs.forEach((tab, index) => tab.addEventListener("click", () => setProfile(index)));

  const sections = [...document.querySelectorAll("[data-act]")];
  const progressItems = [...document.querySelectorAll("[data-progress]")];
  let ticking = false;
  const updateProgress = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const line = window.scrollY + window.innerHeight * 0.28;
      const current = sections.reduce((latest, section) => section.offsetTop > line ? latest : Number(section.dataset.act || 1) - 1, 0);
      progressItems.forEach((item, index) => item.classList.toggle("is-active", index === current));
      ticking = false;
    });
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
})();
