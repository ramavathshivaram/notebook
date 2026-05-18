import React, { memo } from "react";
import { Mail, ShieldCheck, Lock, Check } from "lucide-react";

const steps = [Mail, ShieldCheck, Lock];

const StepContent = ({ currentStep }) => {
  return (
    <div className="flex items-center gap-2 w-full border-b border-border pb-3">
      <div className="flex justify-around items-center w-full">
        {steps.map((Icon, index) => {
          const stepNumber = index;

          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
                ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }
              `}
            >
              {isCompleted ? (
                <Check className="w-5 h-5" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(StepContent);