// Aviso de cookies (LGPD) — o Google Analytics só grava cookies depois do "Aceitar"
(function () {
  var CHAVE = "fh_cookies";
  var escolha = null;
  try { escolha = localStorage.getItem(CHAVE); } catch (e) {}
  if (escolha) return;

  function salvar(valor) {
    try { localStorage.setItem(CHAVE, valor); } catch (e) {}
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: valor === "aceito" ? "granted" : "denied" });
    }
    aviso.remove();
  }

  var aviso = document.createElement("div");
  aviso.className = "aviso-cookies";
  aviso.setAttribute("role", "dialog");
  aviso.setAttribute("aria-label", "Aviso de cookies");
  aviso.innerHTML =
    '<p>Usamos cookies para entender como o site é usado e melhorar sua experiência. ' +
    'Saiba mais na <a href="/privacidade.html">Política de Privacidade</a>.</p>' +
    '<div class="aviso-cookies-botoes">' +
    '<button type="button" class="recusar">Recusar</button>' +
    '<button type="button" class="aceitar">Aceitar</button></div>';
  aviso.querySelector(".aceitar").addEventListener("click", function () { salvar("aceito"); });
  aviso.querySelector(".recusar").addEventListener("click", function () { salvar("recusado"); });

  function mostrar() { document.body.appendChild(aviso); }
  if (document.body) mostrar(); else document.addEventListener("DOMContentLoaded", mostrar);
})();
