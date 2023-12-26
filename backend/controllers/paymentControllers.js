const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require('stripe')("sk_test_51OHXtCSE24due53MY2uxA0ck8OnYkWsnPqiv0pX9TyVJWAAdQJGUHOkY7D2P0ER3dv5fxfvaJ0HycbTvjqtA3Itf007gVmk5zS");

exports.processPayment = catchAsyncErrors(async (req , res , next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "ASTHETIC WOODS",
        },
    });

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
    })
})


exports.sendStripeApiKey = catchAsyncErrors(async(req,res,next) => {
    res.status(200).json({stripeApiKey: process.env.STRIPE_SECRET_KEY});
});
