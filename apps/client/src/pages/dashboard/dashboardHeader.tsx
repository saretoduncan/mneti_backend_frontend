import { NavLinkData } from "@/commons/navlinkData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUserHook from "@/hooks/useUserHook";
import { ArrowDownRight, Copy } from "lucide-react";
import { toast } from "sonner";

const DashboardHeader = () => {
  const { user } = useUserHook();
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error(`Something went wrong ${err}`);
    }
  };
  return (
    <div className="grid gap-4">
      <div>
        <h1 className="font-bold ">
          Hi {user?.profile.firstName + " " + user?.profile.lastName + " 👋🏼"}
        </h1>
        <p>Welcome back😊</p>
      </div>
      <div className="grid gap-2">
        <section className="grid gap-2 md:grid-cols-2 ">
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Balance</CardTitle>
                <CardDescription>Your wallet balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <p>
                    <span>KES</span>{" "}
                    <span className="font-bold text-xl">0.00</span>
                  </p>
                  <Button disabled>
                    Withdraw <ArrowDownRight />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
          <section className="justify-self-stretch">
            <Card>
              <CardHeader>
                <CardTitle>Total Referals</CardTitle>
                <CardDescription>Your total number of referals</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="">
                    <span className="font-bold text-xl">0</span>{" "}
                    <span>users</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </section>

        <section>
          <p className="text-sm">
            Share your referral code to your friends and earn 10 shilling per
            every subscription
          </p>
          <div className="rounded-lg w-full border-2 p-2 flex justify-between items-center">
            <p>
              {window.origin +
                NavLinkData.REGISTER.url +
                "/" +
                user?.referralCode}
            </p>
            <Button
              onClick={() =>
                handleCopy(
                  window.origin +
                    NavLinkData.REGISTER.url +
                    "/" +
                    user?.referralCode
                )
              }
            >
              <Copy />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardHeader;
