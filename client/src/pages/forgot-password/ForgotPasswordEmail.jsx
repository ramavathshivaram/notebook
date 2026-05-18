import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { forgotPasswordApi } from "@/helper/api.js";

const ForgotPasswordEmail = ({ onNext, onPrev, setFormData }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPasswordApi(data);
      setFormData((prev) => ({ ...prev, ...data }));
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        <h1 className="text-2xl font-bold underline">Forgot Password</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex justify-around mt-5">
          <Button type="button" onClick={onPrev}>
            Previous
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Next"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default memo(ForgotPasswordEmail);
