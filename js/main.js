/**
 * あったか灯油便 — サイト設定
 *
 * ネット注文を有効にするとき:
 * ONLINE_ORDER_URL に決済ページのURLを1か所だけ書いてください。
 * 空のままなら「ネットで注文する」ボタンは表示されません。
 */
const ONLINE_ORDER_URL = "";

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const periodEl = document.getElementById("campaign-period");
  if (periodEl) {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    periodEl.textContent =
      end.getFullYear() +
      "年" +
      (end.getMonth() + 1) +
      "月" +
      end.getDate() +
      "日までの期間限定";
  }

  const onlineButtons = document.querySelectorAll(".btn-online-order");
  const url = typeof ONLINE_ORDER_URL === "string" ? ONLINE_ORDER_URL.trim() : "";
  if (url) {
    onlineButtons.forEach(function (btn) {
      btn.hidden = false;
      btn.href = url;
      btn.setAttribute("rel", "noopener noreferrer");
      btn.setAttribute("target", "_blank");
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
