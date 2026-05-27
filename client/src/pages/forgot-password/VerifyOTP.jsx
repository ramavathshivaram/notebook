// VerifyOTP.jsx

import React, { memo } from "react";

import { useForm, Controller } from "react-hook-form";

import { motion } from "motion/react";

import { ShieldCheck, ArrowLeft } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Field, FieldError, FieldGroup, FieldSet } from "@/components/ui/field";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { verifyOTPApi } from "@/helper/api.js";

const VerifyOTP = ({ onNext, onPrev, setFormData, formData }) => {
  const {
    handleSubmit,
    control,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      data = {
        ...formData,
        ...data,
      };

      await verifyOTPApi(data);

      setFormData((prev) => ({
        ...prev,
        ...data,
      }));

      toast.success("OTP verified ✨");

      onNext();
    } catch (error) {
      toast.error(error.message || "Invalid OTP");
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
          <ShieldCheck className="h-6 w-6" />
        </motion.div>

        <h1 className="text-3xl font-black">Verify OTP</h1>

        <p
          className="
            mt-2 text-sm text-muted-foreground
          "
        >
          Enter the 6-digit OTP sent to your email
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FieldSet>
          <FieldGroup>
            <Field>
              <div className="flex justify-center">
                <Controller
                  name="otp"
                  control={control}
                  rules={{
                    required: "OTP is required",

                    minLength: {
                      value: 6,

                      message: "OTP must be 6 digits",
                    },
                  }}
                  render={({ field }) => (
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="
                            h-12 w-12 rounded-xl
                            border-border bg-background/60
                            text-lg backdrop-blur-sm
                          "
                        />

                        <InputOTPSlot
                          index={1}
                          className="
                            h-12 w-12 rounded-xl
                            border-border bg-background/60
                            text-lg backdrop-blur-sm
                          "
                        />

                        <InputOTPSlot
                          index={2}
                          className="
                            h-12 w-12 rounded-xl
                            border-border bg-background/60
                            text-lg backdrop-blur-sm
                          "
                        />
                      </InputOTPGroup>

                      <InputOTPSeparator />

                      <InputOTPGroup>
                        <InputOTPSlot
                          index={3}
                          className="
                            h-12 w-12 rounded-xl
                            border-border bg-background/60
                            text-lg backdrop-blur-sm
                          "
                        />

                        <InputOTPSlot
                          index={4}
                          className="
                            h-12 w-12 rounded-xl
                            border-border bg-background/60
                            text-lg backdrop-blur-sm
                          "
                        />

                        <InputOTPSlot
                          index={5}
                          className="
                            h-12 w-12 rounded-xl
                            border-border bg-background/60
                            text-lg backdrop-blur-sm
                          "
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </div>

              {errors.otp && (
                <FieldError className="mt-3 text-center">
                  {errors.otp.message}
                </FieldError>
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
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(VerifyOTP);
