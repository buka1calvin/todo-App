import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const Layout = () => {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <Navbar/>
      <Outlet />
    </main>
  );
};

export default Layout;
