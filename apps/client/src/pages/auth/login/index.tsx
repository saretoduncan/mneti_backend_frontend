import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { data, Link } from "react-router";
import logo from "@/assets/net_logo.png";
import Inputs_component from "@/components/custom/inputs_component";
import Password_input_compnent from "@/components/custom/password_input_compnent";
import { Label } from "@/components/ui/label";
import type { ILoginRequest } from "@/commons/interfaces/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { Loader } from "lucide-react";
import type { TApiError } from "@/commons/types";
import { toast } from "sonner";

const Login = () => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ILoginRequest>();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      reset();
      console.log(data);
    },
    onError: (err: TApiError) => {
      err.response && toast.error(err.response.data.message);
    },
  });
  const onSubmit: SubmitHandler<ILoginRequest> = (data) => {
    mutate({ username: data.username, password: data.password });
  };
  return (
    <div className="flex-1 grid items-center w-full px-4 ">
      <div className=" mx-auto max-w-sm  auto-rows-fr w-full">
        <Card>
          <CardHeader className="text-center">
            <figure>
              <img src={logo} alt="logo" className="mx-auto w-14" />
              <figcaption className="text-center uppercase font-bold text-sm">
                Mneti
              </figcaption>
            </figure>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Controller
                  name="username"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: "field cannot be empty",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Inputs_component
                      label={"Email"}
                      placeholder={"john@example.om"}
                      {...field}
                      err={errors.username?.message}
                    />
                  )}
                />

                <div className="grid gap-1">
                  <div className="flex justify-between">
                    <Label>Password</Label>
                    <Link to={""} className="text-sm font-light">
                      forgot password?
                    </Link>
                  </div>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="password"
                    rules={{ required: "field cannot be empty" }}
                    render={({ field }) => (
                      <Password_input_compnent
                        placeholder="Password"
                        err={errors.password?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                <div>
                  <Button className="w-full" type="submit">
                    {isPending ? (
                      <>
                        <span>Authenticating </span>
                        <span>
                          <Loader className="animate-spin" />
                        </span>
                      </>
                    ) : (
                      <span>Login</span>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
