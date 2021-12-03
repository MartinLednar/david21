const stripe = require('stripe')(
  process.env.STRIPE_TEST_SECRET2 || process.env.STRIPE_TEST_SECRET
);

exports.createCheckoutSession = async (req, res, next) => {
  try {
    const itemsToCart = req.session.cart.map(item => {
      return {
        name: `${item.name[0].toUpperCase()}${item.name.slice(1)}`,
        description: `${item.author} - ${item.coAuthors.join(' ,')}`,
        amount: item.price * 100,
        currency: 'eur',
        quantity: item.quantity,
      };
    });

    const promotionCodes = await stripe.promotionCodes.list();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/payment-success`,
      cancel_url: `${req.protocol}://${req.get('host')}/pay-mail`,
      customer_email: req.session.buyEmail,
      allow_promotion_codes: true,
      line_items: [...itemsToCart],
    });

    res.redirect(session.url);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};
