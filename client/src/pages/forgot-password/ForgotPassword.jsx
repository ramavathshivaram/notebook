// ForgotPassword.jsx

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";

import BackGround from "@/components/common/BackGround";

import ForgotPasswordEmail from "./ForgotPasswordEmail";

import VerifyOTP from "./VerifyOTP";

import ConformPassword from "./ConformPassword";

import StepContent from "./StepContent";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({});

  const handleNext = () => {
    if (currentStep === 2) {
      navigate("/login");

      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep === 0) return;

    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <ForgotPasswordEmail
      key="email"
      onNext={handleNext}
      onPrev={handlePrev}
      setFormData={setFormData}
    />,

    <VerifyOTP
      key="otp"
      onNext={handleNext}
      onPrev={handlePrev}
      setFormData={setFormData}
      formData={formData}
    />,

    <ConformPassword
      key="password"
      onNext={handleNext}
      onPrev={handlePrev}
      setFormData={setFormData}
      formData={formData}
    />,
  ];

  return (
    <div
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden bg-background px-4
      "
    >
      <BackGround />

      {/* Overlay */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-b
          from-background/70
          via-background/30
          to-background/80
        "
      />

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative z-10 w-full max-w-md
        "
      >
        <Card
          className="
            relative overflow-hidden rounded-[32px]
            border border-border
            bg-card/70 p-8
            shadow-2xl backdrop-blur-2xl
          "
        >
          {/* Glow */}
          <div
            className="
              absolute inset-0 opacity-50
              bg-gradient-to-br
              from-primary/5 to-transparent
            "
          />

          <div className="relative z-10">
            {/* Steps */}
            <StepContent currentStep={currentStep} />

            {/* Content */}
            <CardContent className="px-0 pt-8 pb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  {steps[currentStep]}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
