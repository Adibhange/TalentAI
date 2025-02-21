import { getUserOnboardingStatus } from "@/actions/user";
import DashboardView from "./_component/DashboardView";
import { redirect } from "next/navigation";
import { getIndustryInsights } from "@/actions/dashboard";

const Dashboard = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();
  console.log(insights);
  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
};

export default Dashboard;
