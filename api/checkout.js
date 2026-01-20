// Vercel Serverless Function for Stripe Checkout
// このファイルは /api/checkout として動作します

module.exports = async (req, res) => {
  // CORS設定
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONSリクエストの処理
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POSTのみ許可
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { lineItems, successUrl, cancelUrl } = req.body;

    // TODO: Stripe実装後に以下のコードを有効化
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_address_collection: {
        allowed_countries: ['JP']
      },
      locale: 'ja',
      customer_email: null // Stripeが管理
    });

    res.status(200).json({
      sessionId: session.id,
      url: session.url
    });
    */

    // 現在はプレースホルダー
    res.status(200).json({
      message: 'Stripe Checkout endpoint ready',
      note: 'Stripe実装後に、上記のコメントアウト部分を有効化してください',
      receivedData: {
        lineItems: lineItems?.length || 0,
        successUrl,
        cancelUrl
      }
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
