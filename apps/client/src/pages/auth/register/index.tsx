import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "@/assets/net_logo.png";
import Inputs_component from "@/components/custom/inputs_component";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { IRegisterUserDto } from "@/commons/interfaces/auth.interface";
import Password_input_compnent from "@/components/custom/password_input_compnent";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth";
import type { TApiError } from "@/commons/types";
import { toast } from "sonner";
import { Link } from "react-router";
import { NavLinkData } from "@/commons/navlinkData";
const Register = () => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IRegisterUserDto>();
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      reset();
      console.log(data);
    },
    onError: (err: TApiError) => {
      err.response && toast.error(err.response.data.message);
    },
  });
  const onSubmit: SubmitHandler<IRegisterUserDto> = (data) => {
    mutate(data);
  };
  return (
    <div className="flex-1 w-full  grid items-center">
      <div className="w-full max-w-md lg:max-w-lg mx-auto p-4  ">
        <Card>
          <CardHeader className="text-center">
            <figure>
              <img src={logo} alt="mneti logo" className="w-12 mx-auto" />
              <figcaption className="text-sm font-bold text-center">
                MNETI
              </figcaption>
            </figure>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Register a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-2">
                <Controller
                  control={control}
                  defaultValue=""
                  name={"firstName"}
                  rules={{ required: "Field cannot be emtpy" }}
                  render={({ field }) => (
                    <Inputs_component
                      label={"First Name"}
                      placeholder={"First Name"}
                      err={errors.firstName?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  defaultValue=""
                  name={"lastName"}
                  rules={{ required: "Field cannot be emtpy" }}
                  render={({ field }) => (
                    <Inputs_component
                      label={"Last Name"}
                      placeholder={"Last Name"}
                      err={errors.lastName?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                <Controller
                  control={control}
                  defaultValue=""
                  name={"email"}
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
                      placeholder={"john@example.com"}
                      type="email"
                      err={errors.email?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  defaultValue=""
                  name={"phone_number"}
                  rules={{
                    required: "Field cannot be empty",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  }}
                  render={({ field }) => (
                    <Inputs_component
                      label={"Phone Number"}
                      placeholder={"07**********"}
                      type="number"
                      maxLength={10}
                      err={errors.phone_number?.message}
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <Controller
                  control={control}
                  defaultValue=""
                  name={"date_of_birth"}
                  rules={{
                    required: "field cannot be empty",
                    validate: (value) => {
                      const today = new Date();
                      const dob = new Date(value);
                      const age = today.getFullYear() - dob.getFullYear();
                      const monthDiff = today.getMonth() - dob.getMonth();
                      const dayDiff = today.getDate() - dob.getDate();

                      // Check if user hasn't reached birthday yet this year
                      const isAdult =
                        age > 18 ||
                        (age === 18 &&
                          (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

                      return isAdult || "You must be at least 18 years old";
                    },
                  }}
                  render={({ field }) => (
                    <Inputs_component
                      label={"Date of Birth"}
                      placeholder={"john@example.com"}
                      type="date"
                      err={errors.date_of_birth?.message}
                      {...field}
                    />
                  )}
                />
                <div className="grid gap-1">
                  <Label>Password</Label>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="password"
                    rules={{
                      required: "field cannot be empty",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                        message:
                          "Password must be at least 6 characters, include uppercase, lowercase, and a number",
                      },
                    }}
                    render={({ field }) => (
                      <Password_input_compnent
                        placeholder="Password"
                        err={errors.password?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                <div className="grid gap-1">
                  <Label>Confirm Password</Label>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="confirmPassword"
                    rules={{
                      required: "field cannot be empty",
                      validate: (value) => {
                        return getValues("password") !== value
                          ? "password should match"
                          : true;
                      },
                    }}
                    render={({ field }) => (
                      <Password_input_compnent
                        placeholder="Confirm Password"
                        err={errors.confirmPassword?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                <Controller
                  control={control}
                  defaultValue=""
                  name={"referredByCode"}
                  rules={{ required: "Field cannot be emtpy" }}
                  render={({ field }) => (
                    <Inputs_component
                      label={"Referrer code"}
                      placeholder={"djher-erea"}
                      err={errors.referredByCode?.message}
                      {...field}
                    />
                  )}
                />
              </div>

              <Button>Register</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center gap-1">
            <small>Already have an account? </small>{" "}
            <Link to={NavLinkData.LOGIN_PAGE.url} className="text-primary text-sm underline">
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
