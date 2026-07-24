'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <XCircle className="h-16 w-16 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Payment Cancelled</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your payment was cancelled. No charges have been made to your account.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            If you'd like to support FerrumCSS later, you can always find the support button on our homepage.
          </p>
        </div>

        <div className="pt-4 space-y-2">
          <Link href="/" className="block">
            <Button className="w-full">Return Home</Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">Try Again</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
