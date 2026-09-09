import { JSX } from "react";
import { NavLink } from "react-router-dom";

// Define types for the input item and child item
interface SidebarItem {
  key: string;
  path?: string;
  name?: string;
  icon?: string;
  children?: SidebarItem[]; // Recursive type for nested children
}

interface SidebarItemWithChildren {
  key: string;
  icon: JSX.Element | null;
  label: JSX.Element;
  children?: { key: string; label: JSX.Element }[];
}

export const sidebarItemsGenerator = (
  items: SidebarItem[],
  role: string
): SidebarItemWithChildren[] => {
  const sidebarItems = items.reduce<SidebarItemWithChildren[]>((acc, item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.key,
        icon: item.icon ? (
          <img
            src={item.icon}
            alt="icon"
            width={20}
            style={{
              marginRight: "5px",
              filter: location.pathname.includes(item.path)
                ? "invert(14%) sepia(89%) saturate(7464%) hue-rotate(2deg) brightness(68%) contrast(97%)"
                : undefined,
            }}
          />
        ) : null,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children && item.children.length > 0) {
      acc.push({
        key: item.key,
        icon: item.icon ? (
          <img
            src={item.icon}
            alt="icon"
            width={20}
            style={{
              marginRight: "5px",
              filter: location.pathname.includes(item.path as string)
                ? "invert(14%) sepia(89%) saturate(7464%) hue-rotate(2deg) brightness(68%) contrast(97%)"
                : undefined,
            }}
          />
        ) : null,
        label: <span className="">{item.name}</span>,
        children: item.children
          .filter((child) => child.name) // Ensure child has a name
          .map((child) => ({
            key: child.key,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          })),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
