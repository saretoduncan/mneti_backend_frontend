import useUserHook from "@/hooks/useUserHook";
import DashboardHeader from "./dashboardHeader";


const DashboardPage = () => {
  const {} = useUserHook();
  return (
    <div className="px-4 pt-4">
      <div className="xl:w-[1040px] xl:mx-auto ">
        <DashboardHeader />
         
      </div>
    </div>
  );
};

export default DashboardPage;
