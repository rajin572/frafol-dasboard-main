"use client";

import { useState } from "react";
import ReusableTabs from "../../../ui/ReusableTabs";
import EditProfile from "../../../Components/Dashboard/Profile/EditProfile";
import ChangePassword from "../../../Components/Dashboard/Profile/ChangePassword";

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "changePassword">(
    "profile"
  );
  return (
    <div>
      <div className="mt-10">
        <ReusableTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          align="left"
          tabs={[
            {
              label: "Edit Profile",
              value: "profile",
              content: <EditProfile />,
            },
            {
              label: "Change Password",
              value: "changePassword",
              content: <ChangePassword />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
