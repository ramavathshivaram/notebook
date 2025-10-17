import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import PhysicsHero from "../components/PhysicsHero";
import { sendOTP, verifyOTP, resetPassword } from "../helper/api";

// --------------------- Zod Schemas ---------------------
const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be numeric"),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must match"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// --------------------- Component ---------------------
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: password
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Separate forms per step
  const emailForm = useForm({ resolver: zodResolver(emailSchema) });
  const otpForm = useForm({ resolver: zodResolver(otpSchema) });
  const passwordForm = useForm({ resolver: zodResolver(passwordSchema) });

  // --------------------- Handlers ---------------------
  const handleEmailSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await sendOTP(values.email);
      toast.success("OTP sent to your email 🎉");
      setEmail(values.email);
      setStep(2);
    } catch (err) {
      toast.error(err.message || "Failed to send OTP 😢");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const valid = await verifyOTP(email, values.otp);
      if (valid) {
        toast.success("OTP verified 🎉");
        setStep(3);
      } else {
        toast.error("Invalid OTP 😢");
      }
    } catch (err) {
      toast.error(err.message || "Failed to verify OTP 😢");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await resetPassword(email, values.password);
      toast.success("Password reset successfully 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Failed to reset password 😢");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------- Render ---------------------
  return (
    <motion.div
      className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/80 to-card/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <PhysicsHero />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl pointer-events-none" />

      <Card className="min-w-[400px] p-8 rounded-2xl shadow-lg border border-border/50 backdrop-blur-md bg-card/70">
        {step === 1 && (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="flex flex-col gap-6 w-full"
            >
              <h1 className="text-3xl font-bold text-center">
                Forgot Password
              </h1>
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                <AnimatePresence>
                  {isSubmitting ? (
                    <motion.div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </motion.div>
                  ) : (
                    "Send OTP"
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(handleOTPSubmit)}
              className="flex flex-col gap-6 w-full"
            >
              <h1 className="text-3xl font-bold text-center">Enter OTP</h1>
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 6-digit OTP"
                        {...field}
                        className="transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                <AnimatePresence>
                  {isSubmitting ? (
                    <motion.div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying OTP...
                    </motion.div>
                  ) : (
                    "Verify OTP"
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </Form>
        )}

        {step === 3 && (
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              className="flex flex-col gap-6 w-full"
            >
              <h1 className="text-3xl font-bold text-center">Reset Password</h1>
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...field}
                          className="pr-10 transition-all focus:ring-2 focus:ring-primary/50"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                        className="transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                <AnimatePresence>
                  {isSubmitting ? (
                    <motion.div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Resetting Password...
                    </motion.div>
                  ) : (
                    "Reset Password"
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </Form>
        )}
      </Card>
    </motion.div>
  );
};

export default ForgotPassword;
