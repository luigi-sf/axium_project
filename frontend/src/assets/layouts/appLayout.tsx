import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import "../styles/app.scss";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="main-content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
