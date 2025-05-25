
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className="mx-2"></div>}
          <div 
            className={`h-2 flex-1 rounded-full ${
              index <= currentStep ? 'bg-morocco-gold' : 'bg-gray-300'
            }`}
          ></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
