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
import { resetPasswordApi } from "@/helper/api.js";
import { toast } from "sonner";

const ConformPassword = ({ onNext, onPrev, formData }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.conformPassword) {
      toast.error("Password does not match");
    }

    data = { ...formData, ...data };
    await resetPasswordApi(data);
    onNext();
  };
  return (
    <>
      <div className="flex justify-center mb-5">
        <h1 className="text-2xl font-bold underline">Conform Password</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="conformPassword">ConformPassword</FieldLabel>
              <Input
                id="conformPassword"
                placeholder="abc@example.com"
                type="password"
                {...register("conformPassword", {
                  required: "conformPassword is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.conformPassword && (
                <FieldError>{errors.conformPassword.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex justify-around mt-5">
          <Button type="button" onClick={onPrev}>
            Previous
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default memo(ConformPassword);
