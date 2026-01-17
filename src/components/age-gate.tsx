
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { states } from '@/lib/states';

type AgeGateStep = 'location' | 'age_18' | 'age_21';

export function AgeGate() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<AgeGateStep>('location');
  const [selectedState, setSelectedState] = useState<string | null>(null);

  useEffect(() => {
    const isVerified = localStorage.getItem('age_verified');
    if (!isVerified) {
      setShowModal(true);
    }
  }, []);

  const handleStateSelect = (stateAbbr: string) => {
    const state = states.find(s => s.abbr === stateAbbr);
    if (state) {
      setSelectedState(stateAbbr);
      if (state.minAge === 21) {
        setStep('age_21');
      } else {
        setStep('age_18');
      }
    }
  };

  const handleAgeConfirm = () => {
    localStorage.setItem('age_verified', 'true');
    setShowModal(false);
  };

  const renderStepContent = () => {
    switch (step) {
      case 'age_18':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Age Verification</DialogTitle>
              <DialogDescription>
                You must be 18 years or older to enter.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center pt-4">
              <Button size="lg" onClick={handleAgeConfirm}>
                I am 18 or older
              </Button>
            </div>
          </>
        );
      case 'age_21':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Age Verification</DialogTitle>
              <DialogDescription>
                You must be 21 years or older to enter in your selected state.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center pt-4">
              <Button size="lg" onClick={handleAgeConfirm}>
                I am 21 or older
              </Button>
            </div>
          </>
        );
      case 'location':
      default:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Welcome to MxRaceHub</DialogTitle>
              <DialogDescription>
                Please confirm your location to continue.
              </DialogDescription>
            </DialogHeader>
            <div className="pt-4">
              <Select onValueChange={handleStateSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state.abbr} value={state.abbr}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={showModal}>
      <DialogContent className="sm:max-w-[425px] text-center" hideCloseButton>
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}
