import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ForgotPasswordEmail from "./ForgotPasswordEmail";
import VerifyOTP from "./VerifyOTP";
import ConformPassword from "./ConformPassword";
import StepContent from "./StepContent";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    if (currentStep == 2) {
      navigate("/login");
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep == 0) {
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <ForgotPasswordEmail
      onNext={handleNext}
      onPrev={handlePrev}
      setFormData={setFormData}
    />,
    <VerifyOTP
      onNext={handleNext}
      onPrev={handlePrev}
      setFormData={setFormData}
      formData={formData}
    />,
    <ConformPassword
      onNext={handleNext}
      onPrev={handlePrev}
      setFormData={setFormData}
      formData={formData}
    />,
  ];

  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <Card className="flex w-full max-w-md ">
        <CardHeader>
          <CardTitle className="text-center">
            <StepContent currentStep={currentStep} />
          </CardTitle>
        </CardHeader>
        <CardContent>{steps[currentStep]}</CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
