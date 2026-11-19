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
      phoneBtn.innerHTML =
        serviceName(id) +
        "を電話で予約<br class=\"sp\"><span class=\"btn__sub\">" +
        phoneDisplay +
        "</span>";
    }

    var hint = document.getElementById("booking-phone-hint");
    if (hint) hint.textContent = hints[id] || "";

    var dock = document.getElementById("dock-phone");
    if (dock) {
      dock.href = "tel:" + phoneTel;
      dock.innerHTML =
        '<span class="dock__main">' +
        serviceName(id) +
        "を電話予約</span><span class=\"dock__num\">" +
        phoneDisplay +
        "</span>";
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

  document.querySelectorAll('input[name="service"]').forEach(function (el) {
    el.addEventListener("change", function () {
      if (el.checked) setSelected(el.value);
    });
  });

  document.querySelectorAll(".js-book-jump, .service, .hero-pick").forEach(function (el) {
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
        t.classList.toggle("is-on", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach(function (p) {
        var on = p.getAttribute("data-faq-panel") === id;
        p.classList.toggle("is-on", on);
        p.hidden = !on;
      });
      if (id) setSelected(id);
    });
  });

  var header = document.querySelector("[data-elevate]");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-elevated", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* 灯油便：1〜3缶を選んで、対応するStripeへ1回決済 */
  function initCanOrder() {
    var root = document.getElementById("can-order");
    if (!root) return;

    var touyu = services.touyu || {};
    var packByCans = touyu.packByCans || {};
    var packPrices = touyu.packPrices || { 1: 4500, 2: 7500, 3: 10500 };
    var labels = {
      1: "1缶パック（18L）",
      2: "2缶パック（36L）",
      3: "3缶パック（54L）",
    };
    var min = 1;
    var max = 3;
    var count = 2;

    var countEl = document.getElementById("can-count");
    var breakdownEl = document.getElementById("can-breakdown");
    var totalEl = document.getElementById("can-total");
    var checkout = document.getElementById("can-checkout");
    var hint = document.getElementById("can-hint");
    var badgeEl = document.getElementById("can-badge");
    var minus = document.getElementById("can-minus");
    var plus = document.getElementById("can-plus");

    if (!countEl || !breakdownEl || !totalEl || !checkout || !minus || !plus) {
      return;
    }

    function yen(n) {
      return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function render() {
      var price = packPrices[count] || 0;
      var url = packByCans[count] ? String(packByCans[count]).trim() : "";

      countEl.textContent = String(count);
      breakdownEl.textContent = labels[count] || count + "缶";
      totalEl.textContent = yen(price);

      if (badgeEl) {
        badgeEl.hidden = count !== 2;
      }

      if (url) {
        checkout.href = url;
        checkout.target = "_blank";
        checkout.rel = "noopener noreferrer";
        checkout.textContent = "この内容でネット決済";
        if (hint) hint.textContent = "1回の決済で完了します。";
      } else {
        checkout.href = "tel:" + phoneTel;
        checkout.removeAttribute("target");
        checkout.removeAttribute("rel");
        checkout.textContent = "電話で申し込む";
        if (hint) hint.textContent = "この缶数の決済リンク準備中です。お電話ください。";
      }

      minus.disabled = count <= min;
      plus.disabled = count >= max;
      minus.setAttribute("aria-disabled", count <= min ? "true" : "false");
      plus.setAttribute("aria-disabled", count >= max ? "true" : "false");
    }

    function step(delta) {
      var next = count + delta;
      if (next < min || next > max) return;
      count = next;
      render();
    }

    // 二重発火防止：委譲だけ使う
    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-can-step]");
      if (!btn || !root.contains(btn) || btn.disabled) return;
      e.preventDefault();
      var delta = parseInt(btn.getAttribute("data-can-step"), 10);
      if (!delta) return;
      step(delta);
    });

    render();
  }

  initCanOrder();
  setSelected(selected);
})();
