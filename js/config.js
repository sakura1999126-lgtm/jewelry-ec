/**
 * くらしサポート — サイト設定
 *
 * - EMAIL … 予約メールの宛先（空ならメール予約フォームは出ません）
 * - services.touyu.packByCans … 缶数ごとの Stripe Payment Link（1回決済）
 */
window.KURASHI_CONFIG = {
  brand: "くらしサポート",
  phoneDisplay: "080-7962-1018",
  phoneTel: "08079621018",
  person: "桜井 凜太郎",
  email: "",
  services: {
    touyu: {
      id: "touyu",
      name: "あったか灯油便",
      short: "灯油のお届け",
      stripeUrl: "https://buy.stripe.com/aFa9AU17V4ah8VT0DH2oE01",
      /** 缶数 → 1回で払える決済リンク */
      packByCans: {
        1: "https://buy.stripe.com/aFa9AU17V4ah8VT0DH2oE01",
        2: "https://buy.stripe.com/9B67sMeYL4ah0pneux2oE02",
        3: "https://buy.stripe.com/7sY8wQg2PfSZ5JHgCF2oE04",
      },
      /** 表示用の税込価格 */
      packPrices: {
        1: 4500,
        2: 7500,
        3: 10500,
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
