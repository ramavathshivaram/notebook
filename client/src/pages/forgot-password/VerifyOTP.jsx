import React, { memo } from "react";
import { useForm, Controller } from "react-hook-form";
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
    data = { ...formData, ...data };
    console.log(data);
    await verifyOTPApi(data);
    setFormData((prev) => ({ ...prev, ...data }));
    onNext();
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        <h1 className="text-2xl font-bold underline">Verify OTP</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <div className=" flex justify-center">
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
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </div>

              {errors.otp && <FieldError>{errors.otp.message}</FieldError>}
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex justify-around mt-5">
          <Button type="button" onClick={onPrev}>
            Previous
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default memo(VerifyOTP);
