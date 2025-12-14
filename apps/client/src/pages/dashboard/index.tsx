import useUserHook from "@/hooks/useUserHook";

const DashboardPage = () => {
  const {} = useUserHook();
  return <div>DashboardPage</div>;
};

export default DashboardPage;
