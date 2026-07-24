import { NextRequest, NextResponse } from 'next/server';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { amount, email, method } = await request.json();

    // Validation
    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (method === 'stripe') {
      return handleStripeCheckout(amount, email);
    } else if (method === 'paypal') {
      return handlePayPalCheckout(amount, email);
    } else {
      return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
    }
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}

async function handleStripeCheckout(amount: number, email: string) {
  if (!STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY.' },
      { status: 500 }
    );
  }

  try {
    const stripe = require('stripe')(STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Support FerrumCSS',
              description: 'Help us continue building amazing CSS tools',
              images: ['https://ferrumcss.com/ferrum-logo.png'], // Update with your logo
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/support/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/support/cancel`,
      metadata: {
        email,
        amount,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create Stripe checkout session' },
      { status: 500 }
    );
  }
}

async function handlePayPalCheckout(amount: number, email: string) {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    return NextResponse.json(
      { error: 'PayPal is not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.' },
      { status: 500 }
    );
  }

  try {
    // Get PayPal access token
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const tokenResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Failed to get PayPal access token');
    }

    // Create PayPal order
    const orderResponse = await fetch('https://api-m.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        payer: {
          email_address: email,
        },
        purchase_units: [
          {
            reference_id: 'ferrumcss-support',
            amount: {
              currency_code: 'USD',
              value: amount.toString(),
            },
            description: 'Support FerrumCSS',
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/support/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/support/cancel`,
          brand_name: 'FerrumCSS',
        },
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderData.id) {
      throw new Error('Failed to create PayPal order');
    }

    // Find the approval URL
    const approvalLink = orderData.links.find((link: any) => link.rel === 'approve');

    if (!approvalLink) {
      throw new Error('No approval link in PayPal response');
    }

    return NextResponse.json({ url: approvalLink.href });
  } catch (error) {
    console.error('PayPal error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal checkout' },
      { status: 500 }
    );
  }
}
