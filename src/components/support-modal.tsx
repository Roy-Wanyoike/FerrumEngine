'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface SupportModalProps {
  onClose: () => void;
}

interface PaymentMethod {
  id: 'stripe' | 'paypal';
  name: string;
  description: string;
  recommended?: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Credit/Debit Cards, Apple Pay, Google Pay',
    recommended: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'PayPal Account Balance or Cards',
  },
];

const supportAmounts = [5, 10, 25, 50, 100, 250];

export function SupportModal({ onClose }: SupportModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const amount = customAmount && parseInt(customAmount) > 0 ? parseInt(customAmount) : selectedAmount;

  const handleCheckout = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          email,
          method: selectedMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      if (selectedMethod === 'stripe' && data.url) {
        window.location.href = data.url;
      } else if (selectedMethod === 'paypal' && data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Payment setup failed');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Amount Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Select Amount or Enter Custom</label>
        <div className="grid grid-cols-3 gap-2">
          {supportAmounts.map((amt) => (
            <Button
              key={amt}
              variant={selectedAmount === amt && !customAmount ? 'default' : 'outline'}
              className="w-full"
              onClick={() => {
                setSelectedAmount(amt);
                setCustomAmount('');
              }}
            >
              ${amt}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Or enter custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            min="1"
            className="flex-1"
          />
          <span className="text-sm font-medium text-muted-foreground min-w-fit">
            ${amount}
          </span>
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Email Address</label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Payment Method</label>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={loading}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{method.name}</div>
                  <div className="text-xs text-muted-foreground">{method.description}</div>
                </div>
                {method.recommended && (
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded">
                    Recommended
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info Message */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 Your support helps us maintain and improve FerrumCSS. Thank you!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={onClose} disabled={loading} className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={handleCheckout}
          disabled={loading || amount < 1}
          className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Support with $${amount}`
          )}
        </Button>
      </div>
    </div>
  );
}
