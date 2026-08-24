/* IndiaCure — loads editable content from content.json (maintained via /admin)
   and merges it over the built-in English defaults in window.I18N, then applies
   editable images to any element carrying data-cms-img="<key>". Runs after
   i18n.js (which must load first) and before app.js is not required, but is
   the natural place in the script order. */
(function () {
  "use strict";

  function applyImages(images) {
    if (!images) return;
    document.querySelectorAll("[data-cms-img]").forEach(function (el) {
      var key = el.getAttribute("data-cms-img");
      var url = images[key];
      if (url) {
        el.src = url;
        el.style.display = "block";
      }
    });
  }

  function init() {
    fetch("content.json", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data) return;
        if (data.text && window.I18N && window.I18N.translations && window.I18N.translations.en) {
          Object.keys(data.text).forEach(function (key) {
            if (data.text[key] != null && data.text[key] !== "") {
              window.I18N.translations.en[key] = data.text[key];
            }
          });
          window.I18N.apply(window.I18N.get());
        }
        applyImages(data.images);
      })
      .catch(function () { /* content.json missing or unreachable — site keeps its built-in defaults */ });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
