(function () {
  "use strict";

  var cfg = window.KURASHI_CONFIG || {};
  var services = cfg.services || {};
  var phoneTel = cfg.phoneTel || "08079621018";
  var phoneDisplay = cfg.phoneDisplay || "080-7962-1018";
  var email = (cfg.email || "").trim();

  var hints = {
    touyu: "電話の最初に「灯油便です」とお伝えください。",
    wash: "電話の最初に「高圧洗浄です」とお伝えください。",
  };

  var selected = "touyu";

  function serviceName(id) {
    return (services[id] && services[id].name) || id;
  }

  function setSelected(id) {
    if (!services[id]) return;
    selected = id;

    document.querySelectorAll('input[name="service"]').forEach(function (el) {
      el.checked = el.value === id;
    });

    var phoneBtn = document.getElementById("booking-phone");
    if (phoneBtn) {
      phoneBtn.href = "tel:" + phoneTel;
      phoneBtn.textContent = serviceName(id) + "を電話で予約　" + phoneDisplay;
    }

    var hint = document.getElementById("booking-phone-hint");
    if (hint) hint.textContent = hints[id] || "";

    var dock = document.getElementById("dock-phone");
    if (dock) {
      dock.href = "tel:" + phoneTel;
      dock.textContent = serviceName(id) + "を電話予約　" + phoneDisplay;
    }

    document.querySelectorAll(".js-stripe").forEach(function (btn) {
      var sid = btn.getAttribute("data-service");
      var url =
        services[sid] && services[sid].stripeUrl
          ? String(services[sid].stripeUrl).trim()
          : "";
      if (url) {
        btn.hidden = false;
        btn.href = url;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
      } else {
        btn.hidden = true;
        btn.removeAttribute("href");
      }
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var periodEl = document.getElementById("campaign-period");
  if (periodEl) {
    var now = new Date();
    var end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    periodEl.textContent =
      end.getFullYear() +
      "年" +
      (end.getMonth() + 1) +
      "月" +
      end.getDate() +
      "日までの期間限定";
  }

  document.querySelectorAll('input[name="service"]').forEach(function (el) {
    el.addEventListener("change", function () {
      if (el.checked) setSelected(el.value);
    });
  });

  document.querySelectorAll(".js-book-jump, .service-link").forEach(function (el) {
    el.addEventListener("click", function () {
      var id = el.getAttribute("data-service");
      if (id) setSelected(id);
    });
  });

  document.querySelectorAll(".js-book-phone").forEach(function (el) {
    el.addEventListener("click", function () {
      var id = el.getAttribute("data-service");
      if (id) setSelected(id);
    });
  });

  var mailWrap = document.getElementById("booking-mail");
  var mailPending = document.getElementById("booking-mail-pending");
  if (email) {
    if (mailWrap) mailWrap.hidden = false;
    if (mailPending) mailPending.hidden = true;
  } else {
    if (mailWrap) mailWrap.hidden = true;
    if (mailPending) mailPending.hidden = false;
  }

  var form = document.getElementById("mail-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!email) return;
      var fd = new FormData(form);
      var svc = services[selected] || {};
      var subject = svc.mailSubject || "【予約】くらしサポート";
      var body = [
        "サービス：" + serviceName(selected),
        "お名前：" + (fd.get("name") || ""),
        "電話：" + (fd.get("tel") || ""),
        "希望日時：" + (fd.get("when") || ""),
        "内容：",
        fd.get("detail") || "",
        "",
        "※ホームページの予約フォームから作成",
      ].join("\n");
      window.location.href =
        "mailto:" +
        encodeURIComponent(email) +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }

  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".faq");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-faq");
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach(function (p) {
        var on = p.getAttribute("data-faq-panel") === id;
        p.classList.toggle("is-active", on);
        p.hidden = !on;
      });
      if (id) setSelected(id);
    });
  });

  // Header elevation
  var header = document.querySelector("[data-elevate]");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-elevated", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(
    ".band-head, .service-link, .offer, .price-block, .process li, .quiet-list, .picker, .faq details"
  );
  if (!reduceMotion && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  }

  setSelected(selected);
})();
