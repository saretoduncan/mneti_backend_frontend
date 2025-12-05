import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Link } from "react-router";
import logo from "@/assets/net_logo.png";
import Inputs_component from "@/components/custom/inputs_component";
import Password_input_compnent from "@/components/custom/password_input_compnent";
import { Label } from "@/components/ui/label";

const Login = () => {

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
            <form>
              <div className="grid gap-2">
               <Inputs_component label={"Email"} placeholder={"john@example.om"}/>
               
                <div className="grid gap-1">
                  <div className="flex justify-between">
                    <Label>Password</Label>
                    <Link to={""} className="text-sm font-light">
                      forgot password?
                    </Link>
                  </div>
                  <Password_input_compnent/>
                </div>

                <div>
                  <Button className="w-full">Login</Button>
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
