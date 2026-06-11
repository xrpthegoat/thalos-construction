/* THALOS CONSTRUCTION — main.js
   Enhancement only: the page works fully with JS disabled. */

/* ===== EDIT CONTACT INFO HERE — one place, the whole site follows ===== */
const SITE = {
  phone: '[PHONE]',        // e.g. '(203) 555-0123'  TODO: real value from Steven
  email: '[EMAIL]',        // e.g. 'steven@thalosconstruction.com'  TODO
  area: '[SERVICE AREA]',  // e.g. 'Stamford, CT'  TODO
  license: '[LICENSE #]',  // TODO: confirm with Steven
};

/* ===== EDIT SERVICES HERE — add/remove lines, nothing else changes ===== */
const SERVICES = [
  { id: 'new-construction', title: 'New Construction', blurb: 'Ground-up builds, slab to ridgeline.' },
  { id: 'remodeling',       title: 'Remodeling & Renovation', blurb: 'Kitchens, baths, whole homes. Done right once.' },
  { id: 'additions',        title: 'Additions', blurb: 'More room without moving.' },
  { id: 'kitchens-baths',   title: 'Kitchens & Baths', blurb: 'The two rooms that sell a house.' },
  { id: 'light-commercial', title: 'Light Commercial', blurb: 'Storefronts, offices, fit-outs.' },
  { id: 'decks-exteriors',  title: 'Decks & Exteriors', blurb: 'Decks, siding, the parts weather tests first.' },
];

/* ----- 1. Inject SITE values into all [data-bind] spans + tel/mailto hrefs ----- */
const isPlaceholder = (v) => /^\[.*\]$/.test(v.trim());
document.querySelectorAll('[data-bind]').forEach((el) => {
  const v = SITE[el.dataset.bind];
  if (v && !isPlaceholder(v)) el.textContent = v;
});
document.querySelectorAll('[data-bind-tel]').forEach((el) => {
  if (!isPlaceholder(SITE.phone)) el.href = 'tel:' + SITE.phone.replace(/[^+\d]/g, '');
});
document.querySelectorAll('[data-bind-mail]').forEach((el) => {
  if (!isPlaceholder(SITE.email)) el.href = 'mailto:' + SITE.email;
});

/* ----- 2. Render service cards + form select options from SERVICES ----- */
const grid = document.getElementById('services-grid');
if (grid) {
  grid.innerHTML = SERVICES.map((s, i) => `
    <article class="service-card">
      <span class="card-no" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <h3>${s.title}</h3>
      <p>${s.blurb}</p>
      <a class="card-link" href="#quote" data-service="${s.id}">Get a quote for this <span aria-hidden="true">→</span></a>
    </article>`).join('');
}
const select = document.getElementById('f-service');
if (select) {
  select.innerHTML =
    '<option value="">Select one…</option>' +
    SERVICES.map((s) => `<option value="${s.id}">${s.title}</option>`).join('') +
    '<option value="other">Something else</option>';
}

/* ----- 3. Header compresses after 600px of scroll ----- */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('compressed', window.scrollY > 600);
}, { passive: true });

/* ----- 4. Hide mobile sticky bar while the #quote section is on screen ----- */
const stickyBar = document.getElementById('sticky-bar');
const quoteSection = document.getElementById('quote');
if (stickyBar && quoteSection && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    stickyBar.classList.toggle('bar-hidden', entry.isIntersecting);
  }, { threshold: 0.15 }).observe(quoteSection);
}

/* ----- 5. Service-card links pre-select the form's Project Type ----- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-service]');
  if (link && select) select.value = link.dataset.service;
});
/* ?service= URL param does the same */
const param = new URLSearchParams(location.search).get('service');
if (param && select) select.value = param;

/* ----- 6. Form: fetch enhancement + success state ----- */
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    const key = form.querySelector('[name="access_key"]');
    if (key && isPlaceholder(key.value)) return; // key not set up yet — let the browser handle it
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('send failed');
      document.getElementById('form-card').innerHTML =
        '<div class="form-success"><h3>GOT IT.</h3><p>Steven will call you.</p></div>';
    } catch {
      btn.disabled = false;
      btn.textContent = 'Request My Free Quote';
      alert('Something went wrong sending the form. Please call us instead.');
    }
  });
}
