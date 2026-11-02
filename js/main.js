'use strict';
/* Personalização centralizada. Deixe contatos vazios até existirem canais reais. */
const CONFIG = {
  whatsapp: '', // DDI + DDD + número, apenas dígitos; ex.: número comercial autorizado.
  social: { instagram: '', facebook: '' }, // URLs HTTPS dos perfis reais.
  prices: { corte: 45, barba: 35, combo: 70, acabamento: 20, tratamento: 50 }
};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
$('#year').textContent = new Date().getFullYear();
$$('[data-price]').forEach((element) => { element.textContent = CONFIG.prices[element.dataset.price].toLocaleString('pt-BR'); });
const header = $('#header');
const menu = $('#navigation');
const toggle = $('.menu-toggle');
function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; menu.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
menu.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', (event) => { if (!header.contains(event.target)) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 30); }
window.addEventListener('scroll', updateHeader, { passive: true }); updateHeader();
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const revealObserver = new IntersectionObserver((entries, observer) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.08 });
  $$('.reveal').forEach((element) => revealObserver.observe(element));
  const sectionObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { $$('#navigation a:not(.button)').forEach((link) => { const active = link.hash === `#${entry.target.id}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-15% 0px -55% 0px' });
  $$('main section[id]').forEach((section) => { if ($(`#navigation a[href="#${section.id}"]`)) sectionObserver.observe(section); });
}
// Native dialog provides focus containment, Escape handling and focus restoration.
$$('dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
});
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('modal-open'); }
const galleryItems = $$('[data-gallery]');
const lightbox = $('#lightbox');
let galleryIndex = 0;
function showPhoto(index) { galleryIndex = (index + galleryItems.length) % galleryItems.length; const item = galleryItems[galleryIndex]; const image = item.querySelector('img'); $('#lightbox-image').src = image.src; $('#lightbox-image').alt = image.alt; $('#lightbox-caption').textContent = `${galleryIndex + 1} / ${galleryItems.length} — ${item.dataset.caption}`; }
galleryItems.forEach((item, index) => item.addEventListener('click', () => { showPhoto(index); openDialog(lightbox); }));
$('.gallery-prev').addEventListener('click', () => showPhoto(galleryIndex - 1));
$('.gallery-next').addEventListener('click', () => showPhoto(galleryIndex + 1));
lightbox.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); showPhoto(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1)); } });
function validWhatsapp(number) { return /^[1-9]\d{9,14}$/.test(number); }
if (validWhatsapp(CONFIG.whatsapp)) $('#contact-status').textContent = 'Consulte os horários disponíveis pelo WhatsApp.';
$$('[data-book]').forEach((button) => button.addEventListener('click', () => { const service = button.dataset.book; if (validWhatsapp(CONFIG.whatsapp)) { const message = service ? `Olá! Gostaria de consultar horários para ${service}.` : 'Olá! Gostaria de consultar os horários disponíveis.'; window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); return; } $('#booking-service').textContent = service ? `Serviço selecionado: ${service}` : 'Conheça a proposta de agendamento.'; openDialog($('#booking-dialog')); }));
$('#booking-ok').addEventListener('click', () => $('#booking-dialog').close());
let toastTimer;
function notify(message) { clearTimeout(toastTimer); $('.toast').textContent = message; $('.toast').classList.add('visible'); toastTimer = setTimeout(() => $('.toast').classList.remove('visible'), 4500); }
$$('[data-social]').forEach((button) => button.addEventListener('click', () => { const url = CONFIG.social[button.dataset.social]; try { const parsed = new URL(url); if (parsed.protocol !== 'https:') throw new Error('HTTPS necessário'); window.open(parsed.href, '_blank', 'noopener,noreferrer'); } catch { notify('Perfil demonstrativo. Nenhuma rede social foi configurada.'); } }));
