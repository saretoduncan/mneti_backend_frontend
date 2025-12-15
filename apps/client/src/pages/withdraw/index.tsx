import { withdrawRequest } from "@/api/transaction";
import type { IWithdrawRequest } from "@/commons/interfaces/transactions.interface";
import type { TApiError } from "@/commons/types";
import LoadingButton from "@/components/custom/buttons/loadingButton";
import Input_error_component from "@/components/custom/input_error_component";
import Inputs_component from "@/components/custom/inputs_component";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthHook from "@/hooks/useAuthHook";
import useTransactions from "@/hooks/useTransactions";
import useUserHook from "@/hooks/useUserHook";

import { useMutation } from "@tanstack/react-query";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Withdraw = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
   
  } = useForm<{
    phoneNumber: string;
    amount: number;
  }>();
  const { accessToken } = useAuthHook();
  const { user } = useUserHook();
  const { balance, minimumBalance } = useTransactions();
  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: {
      withReq: IWithdrawRequest;
      accessToken: string;
    }) => {
      return await withdrawRequest(variables.withReq, variables.accessToken);
    },
    onSuccess: () => {
      toast.success("withdrawal success");
      navigate(-1);
    },
    onError: (err) => {
      const e = err as TApiError;
      e.response && toast.error(e.response.data.message);
    },
  });
  const onSubmit: SubmitHandler<{ phoneNumber: string; amount: number }> = (
    data
  ) => {
    mutate({
      withReq: {
        amount: Number(data.amount),
        phoneNumber: data.phoneNumber,
        userProfileId: user!!.profile.id,
      },
      accessToken: accessToken ?? "",
    });
  };
  return (
    <div className="flex-1 ">
      <div className="px-4 py-5 max-w-sm mx-auto">
        <Card>
          <CardHeader>
            <button onClick={() => navigate(-1)}>
              <ArrowBigLeftDashIcon />
            </button>
            <CardTitle>Withdraw</CardTitle>
            <CardDescription>
              Withdraw from your wallet to Your Mpesa account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className=" grid gap-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-1">
                <Label>Phone number</Label>
                <Input
                  type={"tel"}
                  placeholder="07xxxxxxxx"
                  inputMode={"tel"}
                  maxLength={10}
                  {...register("phoneNumber", {
                    required: "phone number is required",
                    pattern: {
                      value: /^(?:\+254|254|0)?7\d{8}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                />
                {errors.phoneNumber?.message && (
                  <Input_error_component message={errors.phoneNumber.message} />
                )}
              </div>
              {
                <Controller
                  control={control}
                  defaultValue={0}
                  rules={{
                    required: "field cannot be emtpy",
                    validate: (value) => {
                      if (minimumBalance && balance) {
                        if (value < minimumBalance.amount) {
                          return (
                            "The minimum amount you can withdraw is: " +
                            minimumBalance.amount
                          );
                        }
                        if (value > balance.balance) {
                          return "You have insufficient balance!";
                        }
                      } else {
                        return true;
                      }
                    },
                  }}
                  name="amount"
                  render={({ field }) => (
                    <Inputs_component
                      label={"Amount"}
                      placeholder={"amount"}
                      type={"number"}
                      {...field}
                    />
                  )}
                />
              }
              {errors.amount?.message && (
                <Input_error_component message={errors.amount.message} />
              )}

              <small>
                Your balance is:KES {balance?.balance} and minimum is:KES{" "}
                {minimumBalance?.amount}
              </small>
              <LoadingButton
                isPending={isPending}
                title={"Withdraw"}
                loadingTitle={"Processing"}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Withdraw;
