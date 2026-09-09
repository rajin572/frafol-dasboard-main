/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd";
import { IGear, IPackage, IProfessional, IWorkshop } from "../../../types";
import ViewWorkshop from "./ViewWorkshop";
import ViewGear from "./ViewGear";
import ViewProfessional from "./ViewProfessional";
import ViewPackage from "./ViewPackage";

// InitialValues

interface ApprovalsViewModalProps {
  isViewModalVisible: boolean;
  showApproveModal: (record: any) => void;
  showDeclineModal: (record: any) => void;
  handleCancel: () => void;
  currentRecord: IProfessional | IPackage | IGear | IWorkshop | null;
  activeTab: string;
}

const ApprovalsViewModal: React.FC<ApprovalsViewModalProps> = ({
  isViewModalVisible,
  showApproveModal,
  showDeclineModal,
  handleCancel,
  currentRecord,
  activeTab,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className={`${activeTab === "gear" ? "lg:!w-[1000px]" : "lg:!w-[700px]"}`}
    >
      {activeTab === "professionals" ? (
        <ViewProfessional
          showApproveModal={showApproveModal}
          showDeclineModal={showDeclineModal}
          currentRecord={currentRecord as IProfessional}
        />
      ) : activeTab === "packages" ? (
        <ViewPackage
          showApproveModal={showApproveModal}
          showDeclineModal={showDeclineModal}
          currentRecord={currentRecord as IPackage}
        />
      ) : activeTab === "gear" ? (
        <ViewGear
          showApproveModal={showApproveModal}
          showDeclineModal={showDeclineModal}
          currentRecord={currentRecord as IGear}
        />
      ) : (
        <ViewWorkshop
          showApproveModal={showApproveModal}
          showDeclineModal={showDeclineModal}
          currentRecord={currentRecord as IWorkshop}
        />
      )}
    </Modal>
  );
};

export default ApprovalsViewModal;
