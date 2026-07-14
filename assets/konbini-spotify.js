// KONBINI Spotify playlist facade.
// Renders nothing but the server-side cover button until the visitor opts in,
// then swaps in the Spotify embed iframe — keeps third-party JS off the
// critical path (CWV). Plain HTMLElement on purpose (same precedent as
// upstream accordion-custom.js for simple components).

class KonbiniSpotify extends HTMLElement {
  #controller = new AbortController();

  connectedCallback() {
    const button = this.querySelector('button');
    button?.addEventListener('click', () => this.#loadEmbed(), { signal: this.#controller.signal });
  }

  disconnectedCallback() {
    this.#controller.abort();
  }

  #loadEmbed() {
    const playlistId = this.dataset.playlistId;
    if (!playlistId || this.querySelector('iframe')) return;

    const height = this.dataset.compact === 'true' ? 152 : 352;
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/playlist/${encodeURIComponent(playlistId)}?theme=0`;
    iframe.width = '100%';
    iframe.height = String(height);
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    iframe.style.border = '0';
    iframe.style.borderRadius = '12px';
    iframe.title = this.dataset.iframeTitle || 'Spotify';

    this.replaceChildren(iframe);
  }
}

if (!customElements.get('konbini-spotify')) {
  customElements.define('konbini-spotify', KonbiniSpotify);
}
