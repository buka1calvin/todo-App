import { Outlet } from "react-router-dom"
import SideNav from "../components/DashSideNav"
import TopNavbar from "../components/bashboard/overview/TopDashNav"

const DashLayout = () => {
  return (
    <main className='flex bg-slate-100'>
      <div className="w-[75px] flex flex-col shadow h-screen items-center justify-center bg-white">
        <SideNav/>
      </div>
      <div className="min-h-screen w-full flex flex-col">
        <TopNavbar/>
        <Outlet />
      </div>
    </main>
  )
}

export default DashLayout
