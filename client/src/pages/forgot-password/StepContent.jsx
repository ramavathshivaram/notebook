// StepContent.jsx

import React, { memo } from "react";

import { motion } from "motion/react";

import { Mail, ShieldCheck, Lock, Check } from "lucide-react";

const steps = [Mail, ShieldCheck, Lock];

const StepContent = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((Icon, index) => {
        const isActive = currentStep === index;

        const isCompleted = currentStep > index;

        return (
          <React.Fragment key={index}>
            {/* Step */}
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.08 : 1,
                }}
                className={`
                  flex h-12 w-12 items-center
                  justify-center rounded-2xl
                  border transition-all duration-300
                  ${
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </motion.div>
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`
                  h-px flex-1 mx-2 transition-all duration-300
                  ${currentStep > index ? "bg-primary" : "bg-border"}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default memo(StepContent);
