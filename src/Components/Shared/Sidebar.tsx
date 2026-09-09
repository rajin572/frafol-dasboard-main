/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import getActiveKeys from "../../utils/activeKey";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../Routes/admin.route";
import logout from "/images/dashboard-logo/logout.svg";

// Define the types for the props
interface SidebarProps {
  normalizedPath: string;
  collapsed: boolean;
  userRole: { role: "admin" | string } | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  normalizedPath,
  collapsed,
  userRole,
}) => {
  const activeKeys = getActiveKeys(normalizedPath);

  // Generate sidebar items for the "admin" role
  const menuItems: any[] =
    userRole?.role === "admin"
      ? sidebarItemsGenerator(adminPaths, userRole?.role)
      : [];

  // Add the logout item
  menuItems.push({
    key: "logout",
    icon: (
      <img
        src={logout}
        alt="logout"
        width={16}
        height={16}
        style={{ color: "#222222", fontSize: "16px", marginRight: "5px" }}
      />
    ),
    label: (
      <div onClick={() => localStorage.removeItem("user_data")}>
        <NavLink to="/sign-in">Logout</NavLink>
      </div>
    ),
  });

  return (
    <Sider
      theme="light"
      width={280}
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      collapsible
      collapsed={collapsed}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#6A0DAD",
      }}
    >
      <Link to="/">me</Link>

      <Menu
        mode="inline"
        defaultSelectedKeys={activeKeys}
        selectedKeys={activeKeys}
        style={{
          backgroundColor: "transparent",
          border: "none",
          paddingLeft: "6px",
          paddingRight: "6px",
        }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
