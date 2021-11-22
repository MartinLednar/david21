const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

exports.createCheckoutSession = async (req, res, next) => {
  const itemsToCart = req.session.cart.map(item => {
    return {
      name: item.name,
      description: `${item.author} - ${item.coAuthors.join(' ,')}`,
      amount: item.price * 100,
      currency: 'eur',
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/payment/success`,
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/payment/cancel`,
    line_items: [...itemsToCart],
  });

  //   res.status(200).json({
  //     status: 'success',
  //     stripeSession: session,
  //   });
  req.session.stripe = session;
  res.redirect(session.url);
};

//polia ktore musi mat item = name, description, amount (cena * 100 = v centoch), currency ('eur'),quantity
