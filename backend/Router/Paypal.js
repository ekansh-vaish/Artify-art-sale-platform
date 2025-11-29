const paypal = require("paypal-rest-sdk");
const express = require("express");
const ExpressError = require("../Utils/ExpressError");
const { jwtAuthMiddleware } = require("../Middleware/Authentication");
const router = express.Router();
paypal.configure({
mode: 'sandbox',
client_id: process.env.PayPal_KEY_ID,
client_secret: process.env.PayPal_SECRET,
});

router.post('/paypalpayment',jwtAuthMiddleware, (req, res,next) => {
const total = req.body.total; 
const create_payment_json = {
intent: 'sale',
payer: {
payment_method: 'paypal',
},
redirect_urls: {
return_url: 'http://localhost:8080/success',
cancel_url: 'http://localhost:8080/cancel',
},
transactions: [{
amount: {
currency: 'USD',
total: total.toString(),
},
description: 'Artify Cart Payment',
}],
};

paypal.payment.create(create_payment_json, function (error, payment) {
if (error) {
next(new ExpressError(500,"Payment creation failed"))
} else {
const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
res.json({ approvalUrl: approvalUrl.href });
}
});
});

router.get('/success', (req, res,next) => {
const payerId = req.query.PayerID;
const paymentId = req.query.paymentId;

const execute_payment_json = {
payer_id: payerId,
};

paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
if (error) {
console.error("Execution Error:", error.response || error);
next(new ExpressError(500<"falied"))
} else {
res.send("✅ Payment successful! Thank you.");
}
});
});

router.get('/cancel', (req, res) => {
res.send("⚠️ Payment cancelled.");
});

module.exports = router;