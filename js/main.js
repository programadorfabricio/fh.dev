// NAV MOBILE
const hamburger = document.getElementById("nav-hamburger");
const mobileMenu = document.getElementById("nav-mobile");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
  // Fecha o menu ao clicar em um link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });
}

// PRICING TOGGLE
let currentMode = "dev";
function switchPricing(force) {
  const next = force || (currentMode === "dev" ? "ads" : "dev");
  currentMode = next;
  const panelDev = document.getElementById("panel-dev");
  const panelAds = document.getElementById("panel-ads");
  const toggle = document.getElementById("pricing-toggle");
  const lblDev = document.getElementById("lbl-dev");
  const lblAds = document.getElementById("lbl-ads");
  if (panelDev) panelDev.classList.toggle("active", next === "dev");
  if (panelAds) panelAds.classList.toggle("active", next === "ads");
  if (toggle) toggle.classList.toggle("ads-mode", next === "ads");
  if (lblDev) lblDev.classList.toggle("active", next === "dev");
  if (lblAds) lblAds.classList.toggle("active", next === "ads");
}
window.switchPricing = switchPricing;

// FAQ ACCORDION
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// FORM SUBMISSION
function enviarFormulario(event) {
  event.preventDefault();
  const nome = document.getElementById("f-nome")?.value;
  const email = document.getElementById("f-email")?.value;
  const whats = document.getElementById("f-whats")?.value;
  const servico = document.getElementById("f-servico")?.value;
  const msg = document.getElementById("f-msg")?.value;
  const btn = document.getElementById("btn-enviar");
  if (!btn) return;
  btn.textContent = "Enviando...";
  btn.disabled = true;
  const params = new URLSearchParams({
    nome,
    email,
    whatsapp: whats || "Não informado",
    servico,
    mensagem: msg,
  });
  fetch(
    "https://script.google.com/macros/s/AKfycbzJFL937FzK-0e8rJW9L0QJaxXaKUVL5Ig-qtXZWZP4aCbJT5kKyagUAjTAntCMdYqWvA/exec?" +
      params.toString(),
    {
      method: "GET",
      mode: "no-cors",
    },
  )
    .then(() => {
      const wrapper = document.getElementById("form-wrapper-inner");
      if (wrapper)
        wrapper.innerHTML = `
      <div style="text-align:center;padding:48px 20px;">
        <div style="font-size:3rem;margin-bottom:16px;">✅</div>
        <h3 style="font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:700;margin-bottom:10px;color:#f0eefc;">Mensagem enviada, ${nome}!</h3>
        <p style="color:#8b8a9b;line-height:1.7;margin-bottom:24px;">Recebi tudo certinho. Entrarei em contato em até <strong style="color:#f0eefc;">24 horas</strong>.</p>
        <a href="https://wa.me/5519981577861" target="_blank" style="display:inline-block;background:#25d366;color:#fff;padding:12px 28px;border-radius:100px;text-decoration:none;font-weight:600;font-size:0.9rem;">Falar pelo WhatsApp</a>
      </div>`;
    })
    .catch((err) => {
      alert("Erro ao enviar: " + err);
      btn.textContent = "Enviar mensagem →";
      btn.disabled = false;
    });
}
window.enviarFormulario = enviarFormulario;

// SMOOTH SCROLL ACTIVE NAV
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});
