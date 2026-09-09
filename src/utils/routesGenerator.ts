interface RouteItem {
  path?: string;
  element?: React.ReactNode; // assuming 'element' is a React component or JSX element
  children?: RouteItem[]; // optional array of child route items
}

interface Route {
  path?: string;
  element?: React.ReactNode;
}

export const routeGenerator = (items: RouteItem[]): Route[] => {
  const routes = items.reduce<Route[]>((acc, item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);

  return routes;
};
