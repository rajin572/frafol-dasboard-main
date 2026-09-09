import { Navigate, useLocation } from "react-router-dom";
import useUserData from "../hooks/useUserData";

interface Props {
  children: React.ReactNode;
}

// Always accessible regardless of routes[] (no permission check needed)
const ALWAYS_ACCESSIBLE = ["overview", "profile", "notifications"];

const AdminRouteGuard: React.FC<Props> = ({ children }) => {
  const userData = useUserData();
  const location = useLocation();

  console.log(userData)

  if (!userData) return <Navigate to="/sign-in" replace />;

  // super-admin has full access
  if (userData.role === "super-admin") return <>{children}</>;

  const currentPath = location.pathname.replace(/^\/admin\//, "");

  // Always-accessible routes need no check
  if (ALWAYS_ACCESSIBLE.some((p) => currentPath === p || currentPath.startsWith(p + "/"))) {
    return <>{children}</>;
  }

  if (userData.role === "admin") {
    const allowedRoutes = userData?.allowedRoutes ?? [];

    // "all" in routes[] means full access
    if (allowedRoutes.includes("all")) return <>{children}</>;

    // Check if current path starts with any allowed route key
    const isAllowed = allowedRoutes.some(
      (route) => currentPath === route || currentPath.startsWith(route + "/")
    );

    if (!isAllowed) return <Navigate to="/admin/overview" replace />;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
