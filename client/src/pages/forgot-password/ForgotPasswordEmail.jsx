// ForgotPasswordEmail.jsx

import React, { memo } from "react";

import { useForm } from "react-hook-form";

import { Mail } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import { forgotPasswordApi } from "@/helper/api.js";

const ForgotPasswordEmail = ({ onNext, setFormData }) => {
  const {
    handleSubmit,
    register,

    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPasswordApi(data);

      setFormData((prev) => ({
        ...prev,
        ...data,
      }));

      toast.success("OTP sent ✨");

      onNext();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <div
          className="
            mx-auto mb-4 flex h-14 w-14
            items-center justify-center
            rounded-2xl border border-border
            bg-muted
          "
        >
          <Mail className="h-6 w-6" />
        </div>

        <h1 className="text-3xl font-black">Forgot Password</h1>

        <p
          className="
            mt-2 text-sm text-muted-foreground
          "
        >
          Enter your email to receive an OTP
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                placeholder="abc@example.com"
                {...register("email", {
                  required: "Email is required",

                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

                    message: "Invalid email address",
                  },
                })}
                className="
                  h-12 rounded-2xl
                  border-border bg-background/60
                  px-4 backdrop-blur-sm
                "
              />

              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
          </FieldGroup>
        </FieldSet>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="
            h-12 w-full rounded-2xl
            text-base font-semibold
          "
        >
          {isSubmitting ? "Sending..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default memo(ForgotPasswordEmail);
