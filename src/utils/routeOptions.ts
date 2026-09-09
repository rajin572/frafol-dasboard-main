// Static route options for the admin permission selector.
// Kept separate from admin.route.tsx to avoid circular imports
// (admin.route.tsx imports page components that import modals that need these options).
export const ADMIN_ROUTE_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Users Management", value: "users-management" },
  { label: "Approvals", value: "approvals" },
  { label: "Order Management", value: "order-management" },
  { label: "Delivery Management", value: "delivery-management" },
  { label: "Gear Marketplace", value: "gear-marketplace" },
  { label: "Package Management", value: "package-management" },
  { label: "Workshop Management", value: "workshop-management" },
  { label: "Forum Management", value: "community-forum-management" },
  { label: "Earnings", value: "earning" },
  { label: "Categories", value: "categories" },
  { label: "Towns", value: "towns" },
  { label: "Reports", value: "reports" },
  { label: "Messages", value: "messages" },
  { label: "Commission Setup", value: "commission-setup" },
  { label: "Coupon", value: "coupon" },
  { label: "Feedback", value: "feedback" },
  { label: "Frafol Choice", value: "frafol-choice" },
  { label: "Newsletter", value: "newsletter" },
  { label: "Interaction", value: "interaction-management" },
  { label: "Documentation", value: "documentation" },
  { label: "Admin Management", value: "admin-management" },
];
