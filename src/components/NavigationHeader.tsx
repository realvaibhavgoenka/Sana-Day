import React from 'react';
import { Sparkles, Heart, Gift, Zap, Video, Mail, Calendar } from 'lucide-react';

interface Props {
  activeStep: number;
  onSelectStep: (step: number) => void;
  girlfriendName: string;
}

export const NavigationHeader: React.FC<Props> = ({ activeStep, onSelectStep, girlfriendName }) => {
  const steps = [
    { id: 1, label: 'Surprise', icon: Gift },
    { id: 2, label: 'Love Meter', icon: Zap },
    { id: 3, label: 'Our Reel', icon: Video },
    { id: 4, label: 'Love Letter', icon: Mail },
    { id: 5, label: 'First Date', icon: Calendar },
  ];

  return (
    <header className="fixed top-3 inset-x-0 z-30 flex justify-center px-4 pointer-events-none">
      <div className="bg-[#FFF9FB]/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-[#FCE4EC] pointer-events-auto flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto">
        <div className="flex items-center gap-1.5 pl-2 pr-3 border-r border-[#FCE4EC] text-xs font-serif italic font-bold text-[#D81B60] shrink-0">
          <Heart className="w-3.5 h-3.5 fill-current text-[#F06292] animate-pulse" />
          <span>For {girlfriendName}</span>
        </div>

        <nav className="flex items-center gap-1 shrink-0">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;

            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#F06292] text-white shadow-md shadow-[#F06292]/20'
                    : 'text-[#744F4F] hover:text-[#D81B60] hover:bg-[#FDF0F3]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#F06292]'}`} />
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
