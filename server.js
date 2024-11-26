// server.js
const express = require('express');
const stripe = require('stripe')('sk_test_51QOqzCLlnrhCHPZebiR76d3Fnesl0jD9O6BjU2oQHQKXPYyT4igGZJ90H1AQCVTk5W9KrkPHtwSIlQFKtLBy6yZz00XJjRC0iz'); // Add secret key later
const app = express();

app.use(express.static('public'));
app.use(express.json());

// API endpoint to create a payment session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Sample Product',
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Success route
app.get('/success', (req, res) => {
    res.send('<h1>Payment Successful!</h1>');
  });
  
  // Cancel route
  app.get('/cancel', (req, res) => {
    res.send('<h1>Payment Canceled!</h1>');
  });
  

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
