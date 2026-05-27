// ConformPassword.jsx

import React, { memo, useState } from "react";

import { useForm } from "react-hook-form";

import { motion } from "motion/react";

import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import { resetPasswordApi } from "@/helper/api.js";

const ConformPassword = ({ onNext, onPrev, formData }) => {
  const {
    handleSubmit,
    register,

    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.conformPassword) {
        toast.error("Passwords do not match");

        return;
      }

      data = {
        ...formData,
        ...data,
      };

      await resetPasswordApi(data);

      toast.success("Password updated successfully ✨");

      onNext();
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
            mx-auto mb-4 flex h-14 w-14
            items-center justify-center
            rounded-2xl border border-border
            bg-muted
          "
        >
          <Lock className="h-6 w-6" />
        </motion.div>

        <h1 className="text-3xl font-black">Reset Password</h1>

        <p
          className="
            mt-2 text-sm text-muted-foreground
          "
        >
          Create a strong new password for your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet>
          <FieldGroup>
            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("password", {
                    required: "Password is required",

                    minLength: {
                      value: 8,

                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="
                    h-12 rounded-2xl
                    border-border bg-background/60
                    pr-12 backdrop-blur-sm
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    text-muted-foreground
                  "
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel htmlFor="conformPassword">
                Confirm Password
              </FieldLabel>

              <div className="relative">
                <Input
                  id="conformPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...register("conformPassword", {
                    required: "Confirm password is required",

                    minLength: {
                      value: 8,

                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="
                    h-12 rounded-2xl
                    border-border bg-background/60
                    pr-12 backdrop-blur-sm
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    text-muted-foreground
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.conformPassword && (
                <FieldError>{errors.conformPassword.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="
              h-12 flex-1 rounded-2xl
            "
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              h-12 flex-1 rounded-2xl
              text-base font-semibold
            "
          >
            {isSubmitting ? "Updating..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(ConformPassword);
