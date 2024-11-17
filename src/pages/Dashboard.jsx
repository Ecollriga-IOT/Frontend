import React from "react";
import { SideBarItem } from "../components/dashboard/SideBar";
import { BiHome } from "react-icons/bi";
import { RiPlantLine } from "react-icons/ri";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { MdOutlineWifiTethering } from "react-icons/md";
import Sidebar from "../components/dashboard/SideBar";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Link, Outlet } from "react-router-dom";

export const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar>
        <SideBarItem icon={<BiHome size={28} />} text="Inicio" id="inicio" />
        <SideBarItem
          icon={<RiPlantLine size={28} />}
          text="Mis Cultivos"
          id="cultivos"
        />
        <SideBarItem
          icon={<PiCurrencyCircleDollar size={28} />}
          text="Plan de Subscripción"
          id="subscripcion"
        />
        <SideBarItem
          icon={<MdOutlineWifiTethering size={28} />}
          text="IoT"
          id="iot"
        />
        <SideBarItem
          icon={<TbDeviceAnalytics size={28} />}
          text="Métricas"
          id="metricas"
        />
      </Sidebar>
      <div className="flex-grow p-[24px] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};
