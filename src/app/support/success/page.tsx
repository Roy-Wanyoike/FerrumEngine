'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Thank You!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your support means everything to us. We'll keep building amazing CSS tools for you.
          </p>
        </div>

        {sessionId && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 break-all">
              <span className="font-semibold">Session ID:</span> {sessionId}
            </p>
          </div>
        )}

        <div className="pt-4 space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You should receive a confirmation email shortly. Check your inbox!
          </p>
          <Link href="/" className="block">
            <Button className="w-full">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
