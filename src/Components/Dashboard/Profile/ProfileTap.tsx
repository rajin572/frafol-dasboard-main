import React from "react";

// Define the types for the props
interface ProfileTapProps {
  activeTab: "editProfile" | "changePassword"; // activeTab can be either "editProfile" or "changePassword"
  setActiveTab: (tab: "editProfile" | "changePassword") => void; // setActiveTab function updates activeTab
}

const ProfileTap: React.FC<ProfileTapProps> = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab: "editProfile" | "changePassword") => {
    setActiveTab(tab);
  };

  return (
    <div className="flex mt-5">
      {/* Edit Profile Tab */}
      <button
        onClick={() => handleTabClick("editProfile")}
        className={`text-lg font-medium py-2 ${
          activeTab === "editProfile"
            ? "bg-gradient-to-b from-[#22355833] to-[#22355812] text-secondary-color border-t-2 border-secondary-color"
            : "text-[#4b5563] border-t-2 border-gray-300"
        }`}
      >
        <span className="px-4">Edit Profile</span>
      </button>

      {/* Change Password Tab */}
      <button
        onClick={() => handleTabClick("changePassword")}
        className={`text-lg font-medium py-2 ${
          activeTab === "changePassword"
            ? "bg-gradient-to-b from-[#22355833] to-[#22355812] text-secondary-color border-t-2 border-secondary-color"
            : "text-[#4b5563] border-t-2 border-gray-300"
        }`}
      >
        <span className="px-4">Change Password</span>
      </button>
    </div>
  );
};

export default ProfileTap;
