(() => {
  const demo = document.querySelector('.product-demo');
  if (!demo) return;

  const contexts = [
    {
      label: 'Личное',
      name: 'Евгений',
      note: 'Для тех, с кем можно быть без формальностей.',
      term: 'Постоянно',
      accent: 'mint',
      image: '/pager-investor/ledger/profile-1.png',
      rules: [['Разрешены', 'Разрешены'], ['Разрешены', 'Разрешены'], ['В beta', 'В beta'], ['Разрешены', 'Разрешены'], ['Следующий этап', 'Следующий этап'], ['Разрешено', 'Разрешено'], ['В beta', 'В beta'], ['Разрешена', 'Разрешена']],
    },
    {
      label: 'Работа',
      name: 'Е. Мартынов',
      note: 'Рабочее представление с понятным способом связи.',
      term: 'Постоянно',
      accent: 'blue',
      image: '/pager-investor/ledger/profile-2.png',
      rules: [['Разрешены', 'Разрешены'], ['Разрешены', 'Разрешены'], ['В beta', 'В beta'], ['По запросу', 'По запросу'], ['Следующий этап', 'Следующий этап'], ['По запросу', 'По запросу'], ['В beta', 'В beta'], ['Скрыта', 'Скрыта']],
    },
    {
      label: 'Гостевое',
      name: 'Evgeny',
      note: 'Минимум информации для нового или временного контакта.',
      term: '24:00:00',
      accent: 'gold',
      image: '/pager-investor/ledger/profile-3.png',
      rules: [['Разрешены', 'Разрешены'], ['В beta', 'В beta'], ['Следующий этап', 'Следующий этап'], ['Закрыты', 'Закрыты'], ['Закрыты', 'Закрыты'], ['Закрыто', 'Закрыто'], ['В beta', 'В beta'], ['Скрыта', 'Скрыта']],
    },
  ];

  const tabs = [...demo.querySelectorAll('[role="tab"]')];
  const panel = demo.querySelector('[role="tabpanel"]');
  const profile = demo.querySelector('.product-demo__profile');
  const rules = [...demo.querySelectorAll('.rule-list > div')];

  const stateClass = (value) => {
    if (value.includes('Разреш')) return 'is-open';
    if (value.includes('Закры') || value.includes('Скры')) return 'is-closed';
    return 'is-planned';
  };

  const render = (index) => {
    const context = contexts[index];
    if (!context) return;
    demo.className = `product-demo product-demo--${context.accent}`;
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panel?.setAttribute('aria-labelledby', `profile-tab-${['personal', 'work', 'guest'][index]}`);
    if (profile) {
      const dot = profile.querySelector('.profile-dot');
      const title = profile.querySelector('h3');
      const note = profile.querySelector('p');
      const values = profile.querySelectorAll('dd');
      if (dot) dot.textContent = context.name.slice(0, 1);
      if (title) title.textContent = context.name;
      if (note) note.textContent = context.note;
      if (values[0]) values[0].textContent = context.label;
      if (values[1]) values[1].textContent = context.term;
    }
    rules.forEach((row, rowIndex) => {
      const value = context.rules[rowIndex]?.[1];
      const badge = row.querySelector('b');
      if (!badge || !value) return;
      badge.textContent = value;
      badge.className = stateClass(value);
    });
  };

  tabs.forEach((tab, index) => tab.addEventListener('click', () => render(index)));
  render(0);
})();
