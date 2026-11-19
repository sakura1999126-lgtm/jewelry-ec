/**
 * くらしサポート — サイト設定
 *
 * あとから変える場所は、基本ここだけです。
 * - EMAIL … 予約メールの宛先（空ならメール予約ボタンは出ません）
 * - services.touyu.packs … 1缶 / 2缶の Stripe Payment Link
 * - services.touyu.setLinks … 3缶以上を「1回の決済」にするためのセット用 Payment Link
 *   Stripeダッシュボードで「3缶セット 10,500円」などを作り、URLを貼ってください。
 */
window.KURASHI_CONFIG = {
  brand: "くらしサポート",
  phoneDisplay: "080-7962-1018",
  phoneTel: "08079621018",
  person: "桜井 凜太郎",
  /** 予約受付メール。設定するとメール予約フォームが使えます */
  email: "",
  services: {
    touyu: {
      id: "touyu",
      name: "あったか灯油便",
      short: "灯油のお届け",
      stripeUrl: "https://buy.stripe.com/aFa9AU17V4ah8VT0DH2oE01",
      packs: {
        one: "https://buy.stripe.com/aFa9AU17V4ah8VT0DH2oE01",
        two: "https://buy.stripe.com/9B67sMeYL4ah0pneux2oE02",
        extra: "https://buy.stripe.com/00w7sM8AnbCJ6NL2LP2oE03",
      },
      /**
       * 3缶以上を1回の決済にまとめるセット用リンク。
       * 未設定の缶数は、二重決済を避けるため電話申し込みになります。
       * 金額の目安: 3缶=10500 / 4缶=13500 / 5缶=16500 / 6缶=19500
       */
      setLinks: {
        3: "",
        4: "",
        5: "",
        6: "",
      },
      mailSubject: "【予約】あったか灯油便",
    },
    wash: {
      id: "wash",
      name: "高圧洗浄",
      short: "駐車場の高圧洗浄",
      stripeUrl: "",
      mailSubject: "【予約】高圧洗浄（駐車場）",
    },
  },
};
