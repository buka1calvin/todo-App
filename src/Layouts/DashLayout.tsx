import { Outlet } from "react-router-dom";
import SideNav from "../components/DashSideNav";
import TopNavbar from "../components/bashboard/overview/TopDashNav";
import BottomNav from "../components/BottomNav";

const DashLayout = () => {
  return (
    <main className="flex flex-col lg:flex-row bg-slate-100 dark:bg-gray-800 min-h-screen w-full">
      <div className="z-10 hidden lg:flex w-[80px] flex-col shadow h-screen items-center justify-center bg-white dark:bg-gray-800">
        <SideNav />
      </div>
      <div className="w-full flex flex-col">
        <TopNavbar />
        <div className="flex-grow w-full px-2 pb-24 md:p-4 h-full">
          <Outlet />
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 w-full border-t shadow">
        <BottomNav />
      </div>
    </main>
  );
};

export default DashLayout;
