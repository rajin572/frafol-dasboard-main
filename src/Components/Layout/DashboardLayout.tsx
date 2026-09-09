import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useMemo, useState } from "react";
import getActiveKeys from "../../utils/activeKey";
import { adminPaths } from "../../Routes/admin.route";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import Topbar from "../Shared/Topbar";
import { AllImages } from "../../../public/images/AllImages";
import logout from "../../../public/images/dashboard-logo/logout.svg";
import useUserData from "../../hooks/useUserData";
import Cookies from "js-cookie";
import AdminRouteGuard from "../../Routes/AdminRouteGuard";

// Keys that are always visible regardless of routes[]
const ALWAYS_SIDEBAR_VISIBLE = ["overview", "profile"];

const DashboardLayout = () => {
  const userData = useUserData();
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const rootSubmenuKeys = ["orders", "service", "settings"];

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    if (latestOpenKey && rootSubmenuKeys.includes(latestOpenKey)) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys(keys);
    }
  };

  const defaultUrl = "/admin";
  const normalizedPath = location.pathname.replace(defaultUrl, "");

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter sidebar paths based on role and allowed routes
  const filteredPaths = useMemo(() => {
    if (!userData) return [];

    // super-admin sees everything
    if (userData.role === "super-admin") return adminPaths;

    if (userData.role === "admin") {
      const allowedRoutes = userData.allowedRoutes ?? [];
      const hasAll = allowedRoutes.includes("all");

      return adminPaths
        .map((item) => {
          // Items with no name (like notifications) are never shown
          if (!item.name && !item.children) return null;

          // Always-visible items
          if (ALWAYS_SIDEBAR_VISIBLE.includes(item.key)) return item;

          if (hasAll) return item;

          // Parent items with children: show if key is in allowedRoutes
          if (item.children) {
            if (!allowedRoutes.includes(item.key)) return null;
            return item;
          }

          // Flat items
          return allowedRoutes.includes(item.key) ? item : null;
        })
        .filter(Boolean) as typeof adminPaths;
    }

    return [];
  }, [userData]);

  const activeKeys = getActiveKeys(normalizedPath);
  const menuItems =
    userData?.role === "admin" || userData?.role === "super-admin"
      ? sidebarItemsGenerator(filteredPaths, "admin")
      : [];

  const handleLogout = () => {
    Cookies.remove("frafoldashboard_accessToken");
    window.location.href = "/sign-in";
    window.location.reload();
  };

  menuItems.push({
    key: "logout",
    icon: <img src={logout} alt="logout" width={16} height={16} />,
    label: (
      <div onClick={handleLogout}>
        <NavLink to="/sign-in">Logout</NavLink>
      </div>
    ),
  });

  return (
    <div className="h-screen bg-ribg-primary-color ">
      <ScrollRestoration />

      <Layout className="flex !bg-primary-color">
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
            backgroundColor: "#ffffff",
          }}
          className="!border-l !border-r !border-[#E5E5E5]"
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              className="w-[90%] mx-auto h-auto my-5"
            />
          </Link>

          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
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
        <Layout>
          <Header
            style={{
              background: "#ffffff",
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 0,
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-primary-color px-2 xl:px-5 py-4 xl:py-5">
              <AdminRouteGuard>
                <Outlet />
              </AdminRouteGuard>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
