// KONBINI hero search — giant search-first input with predictive results
// (June-session concept: debounce → Predictive Search API → inline results;
// popular-phrase chips; Escape closes; Enter submits the plain GET form).
// Progressive enhancement: without JS this is a working /search form.

class KonbiniHeroSearch extends HTMLElement {
  #controller = new AbortController();
  #debounce = null;

  connectedCallback() {
    const { signal } = this.#controller;
    const input = this.querySelector('input[type="search"]');
    const panel = this.querySelector('[data-results]');
    if (!input || !panel) return;

    input.addEventListener(
      'input',
      () => {
        clearTimeout(this.#debounce);
        const q = input.value.trim();
        if (q.length < 2) {
          this.#close();
          return;
        }
        this.#debounce = setTimeout(() => this.#fetch(q), 240);
      },
      { signal }
    );

    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape') this.#close();
      },
      { signal }
    );
    document.addEventListener(
      'click',
      (e) => {
        if (e.target instanceof Node && !this.contains(e.target)) this.#close();
      },
      { signal }
    );

    for (const chip of this.querySelectorAll('[data-chip]')) {
      chip.addEventListener(
        'click',
        () => {
          input.value = chip.dataset.chip || '';
          input.form?.submit();
        },
        { signal }
      );
    }
  }

  disconnectedCallback() {
    this.#controller.abort();
    clearTimeout(this.#debounce);
  }

  async #fetch(query) {
    const limit = this.dataset.maxResults || '6';
    const url = `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=${limit}&resources[options][unavailable_products]=hide`;
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      this.#render(data?.resources?.results?.products || [], query);
    } catch (e) {
      /* network hiccup — keep quiet, plain form still works */
    }
  }

  #render(products, query) {
    const panel = this.querySelector('[data-results]');
    const input = this.querySelector('input[type="search"]');
    if (!panel) return;

    if (!products.length) {
      panel.hidden = true;
      input?.setAttribute('aria-expanded', 'false');
      return;
    }

    const money = (value) => {
      const num = typeof value === 'string' ? parseFloat(value) : value / 100;
      return Number.isFinite(num) ? num.toFixed(2).replace('.', ',') + ' zł' : '';
    };
    const thumb = (p) => {
      const src = p.featured_image?.url || p.image;
      if (!src) return '<span class="konbini-hero-search__result-thumb"></span>';
      const sized = src + (src.includes('?') ? '&' : '?') + 'width=96';
      return `<img src="${sized}" width="48" height="48" loading="lazy" alt="">`;
    };

    panel.innerHTML = products
      .map(
        (p) => `
        <li>
          <a href="${p.url}" class="konbini-hero-search__result">
            ${thumb(p)}
            <span class="konbini-hero-search__result-title">${p.title}</span>
            <span class="konbini-hero-search__result-price">${money(p.price)}</span>
          </a>
        </li>`
      )
      .join('');
    panel.hidden = false;
    input?.setAttribute('aria-expanded', 'true');
  }

  #close() {
    const panel = this.querySelector('[data-results]');
    const input = this.querySelector('input[type="search"]');
    if (panel) panel.hidden = true;
    input?.setAttribute('aria-expanded', 'false');
  }
}

if (!customElements.get('konbini-hero-search')) {
  customElements.define('konbini-hero-search', KonbiniHeroSearch);
}
