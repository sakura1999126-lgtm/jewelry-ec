/**
 * ネット注文を出すとき、下の URL に決済ページを1か所だけ書いてください。
 * 空なら「ネットで注文する」は出ません。
 */
const ONLINE_ORDER_URL = "";

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

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

  const url = typeof ONLINE_ORDER_URL === "string" ? ONLINE_ORDER_URL.trim() : "";
  document.querySelectorAll(".btn-online-order").forEach(function (btn) {
    if (!url) {
      btn.hidden = true;
      return;
    }
    btn.hidden = false;
    btn.href = url;
    btn.rel = "noopener noreferrer";
    btn.target = "_blank";
  });
})();
