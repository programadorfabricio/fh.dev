// Aviso de cookies (LGPD) — o Google Analytics só grava cookies depois do "Aceitar".
// Qualquer botão com data-preferencias-cookies reabre o aviso.
(function () {
  var CHAVE = "fh_cookies";
  var aviso = null;

  function lerEscolha() {
    try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
  }

  function salvar(valor) {
    try { localStorage.setItem(CHAVE, valor); } catch (e) {}
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: valor === "aceito" ? "granted" : "denied" });
    }
    fechar();
  }

  function fechar() {
    if (aviso) { aviso.remove(); aviso = null; }
  }

  function abrir() {
    if (aviso) return;
    var escolha = lerEscolha();
    aviso = document.createElement("div");
    aviso.className = "aviso-cookies";
    aviso.setAttribute("role", "dialog");
    aviso.setAttribute("aria-label", "Preferências de cookies");
    aviso.innerHTML =
      '<p>Usamos cookies para entender como o site é usado e melhorar sua experiência. ' +
      'Saiba mais na <a href="/privacidade.html">Política de Privacidade</a>.' +
      (escolha ? ' <br><small>Sua escolha atual: <strong>' + (escolha === "aceito" ? "aceitos" : "recusados") + '</strong>.</small>' : "") +
      '</p>' +
      '<div class="aviso-cookies-botoes">' +
      '<button type="button" class="recusar">Recusar</button>' +
      '<button type="button" class="aceitar">Aceitar</button></div>';
    aviso.querySelector(".aceitar").addEventListener("click", function () { salvar("aceito"); });
    aviso.querySelector(".recusar").addEventListener("click", function () { salvar("recusado"); });
    document.body.appendChild(aviso);
  }

  function iniciar() {
    document.addEventListener("click", function (ev) {
      var alvo = ev.target.closest && ev.target.closest("[data-preferencias-cookies]");
      if (alvo) { ev.preventDefault(); abrir(); }
    });
    if (!lerEscolha()) abrir();
  }

  window.fhCookies = { abrir: abrir };
  if (document.body) iniciar(); else document.addEventListener("DOMContentLoaded", iniciar);
})();
