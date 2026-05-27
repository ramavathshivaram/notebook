import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { motion, AnimatePresence } from "motion/react";

import {
  Eye,
  EyeOff,
  Loader2,
  BookOpen,
  Sparkles,
  Lock,
  Zap,
} from "lucide-react";

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

import { Separator } from "@/components/ui/separator";

import BackGround from "@/components/common/BackGround";

import useAuthStore from "@/store/auth.store.js";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),

  password: z.string().min(1, "Password is required"),
});

const stats = [
  {
    icon: Zap,
    label: "Fast",
  },

  {
    icon: Lock,
    label: "Secure",
  },

  {
    icon: Sparkles,
    label: "AI Powered",
  },
];

const Login = () => {
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [errorShake, setErrorShake] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await login(values);

      navigate("/notebook");
    } catch (error) {
      toast.error(error.message || "Login failed 😢");

      setErrorShake(true);

      setTimeout(() => setErrorShake(false), 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden bg-background px-4
      "
    >
      {/* Background */}
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

      {/* Login Card */}
      <motion.div
        animate={
          errorShake
            ? {
                x: [-10, 10, -10, 10, 0],
              }
            : {}
        }
        transition={{ duration: 0.4 }}
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        className="relative z-10 w-full max-w-md"
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
            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                mx-auto mb-6 flex h-16 w-16
                items-center justify-center
                rounded-2xl border border-border
                bg-muted
              "
            >
              <BookOpen className="h-7 w-7" />
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-8 text-center"
            >
              <h1
                className="
                  text-4xl font-black
                  tracking-tight
                "
              >
                Welcome Back
              </h1>

              <p
                className="
                  mt-2 text-sm
                  text-muted-foreground
                "
              >
                Login to continue to your smart notebook workspace
              </p>
            </motion.div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="
                            h-12 rounded-2xl
                            border-border
                            bg-background/60
                            px-4 backdrop-blur-sm
                            focus-visible:ring-2
                            focus-visible:ring-primary/20
                          "
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div
                        className="
                          flex items-center
                          justify-between
                        "
                      >
                        <FormLabel>Password</FormLabel>

                        <button
                          type="button"
                          onClick={() => navigate("/forgot-password")}
                          className="
                            text-sm text-primary
                            transition hover:underline
                          "
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="
                              h-12 rounded-2xl
                              border-border
                              bg-background/60
                              px-4 pr-12
                              backdrop-blur-sm
                              focus-visible:ring-2
                              focus-visible:ring-primary/20
                            "
                          />
                        </FormControl>

                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="
                            absolute right-4 top-1/2
                            -translate-y-1/2
                            text-muted-foreground
                            transition hover:text-foreground
                          "
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="
                    h-12 w-full rounded-2xl
                    text-base font-semibold
                    shadow-lg shadow-primary/20
                    transition-all duration-300
                    hover:scale-[1.02]
                  "
                >
                  <AnimatePresence mode="wait">
                    {form.formState.isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="
                          flex items-center gap-2
                        "
                      >
                        <Loader2
                          className="
                            h-5 w-5 animate-spin
                          "
                        />
                        Logging in...
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        Get Started →
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </form>
            </Form>

            {/* Separator */}
            <div className="relative py-6">
              <Separator />

              <span
                className="
                  absolute left-1/2 top-1/2
                  -translate-x-1/2 -translate-y-1/2
                  bg-card px-3 text-xs
                  text-muted-foreground
                "
              >
                OR
              </span>
            </div>

            {/* Footer */}
            <div
              className="
                flex flex-col items-center gap-4
              "
            >
              <div
                className="
                  text-sm text-muted-foreground
                "
              >
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="
                    font-medium text-primary
                    transition hover:underline
                    hover:text-primary/80
                  "
                >
                  Create one
                </Link>
              </div>

              {/* Stats */}
              <div
                className="
                  mt-2 flex items-center
                  justify-center gap-5
                  text-xs text-muted-foreground
                "
              >
                {stats.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="
                        flex items-center gap-1.5
                      "
                    >
                      <Icon className="h-3.5 w-3.5" />

                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Login;
