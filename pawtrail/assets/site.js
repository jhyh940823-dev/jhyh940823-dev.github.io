(() => {
  const supported = ['ko', 'en', 'ja'];
  const stored = window.localStorage.getItem('pawtrail-language');
  const browser = (navigator.language || 'ko').toLowerCase();
  const initial = supported.includes(stored)
    ? stored
    : supported.find((code) => browser === code || browser.startsWith(`${code}-`)) || 'ko';

  function applyLanguage(language) {
    const selected = supported.includes(language) ? language : 'ko';
    document.documentElement.lang = selected;
    document.querySelectorAll('[data-language]').forEach((panel) => {
      panel.hidden = panel.getAttribute('data-language') !== selected;
    });
    document.querySelectorAll('[data-language-button]').forEach((button) => {
      const active = button.getAttribute('data-language-button') === selected;
      if (active) {
        button.setAttribute('aria-current', 'page');
      } else {
        button.removeAttribute('aria-current');
      }
    });
    window.localStorage.setItem('pawtrail-language', selected);
  }

  document.querySelectorAll('[data-language-button]').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.getAttribute('data-language-button')));
  });

  applyLanguage(initial);
})();
