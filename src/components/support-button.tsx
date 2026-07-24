'use client';

import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SupportModal } from './support-modal';

export function SupportButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 z-40"
          size="icon"
          title="Support FerrumCSS"
        >
          <Heart className="h-5 w-5 fill-current" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Support FerrumCSS</DialogTitle>
          <DialogDescription>
            Help us continue building amazing CSS tools and components. Your support means everything!
          </DialogDescription>
        </DialogHeader>
        <SupportModal onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
