import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import VerifyOtpForm from "../components/VerifyOtpForm";
import ConformPassword from "../components/ConformPassword";
import BackGround from "../components/BackGround";

const VerifyOTP = () => {
  const { userId } = useParams();
  const [step, setStep] = useState("OTP");

  return (
    <motion.div
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/80 to-card/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <BackGround />
      <div>
        {step === "OTP" ? (
          <VerifyOtpForm userId={userId} setStep={setStep} />
        ) : (
          <ConformPassword userId={userId} />
        )}
      </div>
    </motion.div>
  );
};
export default VerifyOTP;
