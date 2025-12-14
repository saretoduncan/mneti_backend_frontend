import Input_error_component from "@/components/custom/input_error_component";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

const SubscriptionPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<{ phoneNumber: string }>();
  const handleDiaologOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
const onSubmit:SubmitHandler<{phoneNumber:string}>=(data)=>{
  console.log(data)
}

  return (
    <div className="">
      <div className="px-4 pt-10 grid gap-4 max-w-sm mx-auto">
        <div>
          <h2 className="text-center font-bold text-2xl capitalize">
            Welcome🤗 Here is your <span className="text-primary">Package</span>
          </h2>
          <p className="text-center">
            Pre-purchase now and lock in our launch pricing. Limited spots
            available!
          </p>
        </div>
        <div>
          <Card className="">
            <CardHeader className="text-center">
              <CardTitle className="">Standard</CardTitle>
              <CardDescription>
                <p>100 Mbps</p>
                <p className="text-lg font-bold">KES 30</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div>
                <ul className="list-disc list-inside">
                  <li>3 day of unlimited data</li>
                  <li>24/7 phone support</li>
                  <li>Advance security</li>
                  <li>Get 10 shillings per every referal</li>
                </ul>
              </div>
              <div>
                <Button className="w-full " onClick={handleDiaologOpen}>
                  Pre-purchase Now
                </Button>
              </div>
              <AlertDialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Mpesa Payment</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please enter your number in order to recieve an stk push
                      for payment
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
                    <div className="grid gap-1">
                      <Label>Phone Number</Label>
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
                      {errors.phoneNumber?.message && <Input_error_component message={errors.phoneNumber.message}/>}
                    </div>
                    <Button className="w-full" type={"submit"}>
                      Submit
                    </Button>
                  </form>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
