import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IDeleteAccountRequest } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { formatDate } from "../../../utils/dateFormet";

interface Props {
  open: boolean;
  onCancel: () => void;
  record: IDeleteAccountRequest | null;
}

const DeleteAccountRequestDetailModal: React.FC<Props> = ({
  open,
  onCancel,
  record,
}) => {
  const serverUrl = getImageUrl();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      className="!max-w-[500px] !w-[90%]"
    >
      <div className="p-5">
        <h3 className="text-2xl font-bold text-center text-secondary-color mb-1">
          Delete Account Request
        </h3>
        <p className="text-sm text-center text-[#989898] mb-6">
          Details of the account deletion request
        </p>

        <div className="flex flex-col items-center gap-2 mb-6">
          <img
            src={
              record?.profileImage
                ? serverUrl + record.profileImage
                : AllImages.profile
            }
            alt={record?.name}
            className="w-16 h-16 rounded-full object-cover border"
          />
          <h2 className="text-xl font-semibold text-secondary-color">
            {record?.name} {record?.sureName || ""}
          </h2>
          <span className="capitalize text-sm text-gray-500">{record?.role}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-secondary-color/5 rounded-lg p-4">
          <div>
            <span className="font-semibold text-secondary-color">Email:</span>{" "}
            <span className="text-sm">{record?.email}</span>
          </div>
          <div>
            <span className="font-semibold text-secondary-color">
              Requested On:
            </span>{" "}
            <span className="text-sm">{formatDate(record?.deleteRequestedAt)}</span>
          </div>
          <div>
            <span className="font-semibold text-secondary-color">Status:</span>{" "}
            <span
              className={`text-sm font-medium capitalize ${record?.deleteRequestStatus === "approved"
                ? "text-green-600"
                : record?.deleteRequestStatus === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
                }`}
            >
              {record?.deleteRequestStatus}
            </span>
          </div>
          {(record?.activeEventOrders ?? 0) > 0 ||
            (record?.activeGearOrders ?? 0) > 0 ? (
            <div>
              <span className="font-semibold text-secondary-color">
                Active Orders:
              </span>{" "}
              <span className="text-sm text-red-600">
                {record?.activeEventOrders} event, {record?.activeGearOrders} gear
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-4">
          <p className="font-semibold text-secondary-color mb-1">
            Reason for deletion:
          </p>
          <div className="bg-gray-100 rounded-md p-3 text-sm text-base-color">
            {record?.deleteRequestReason || "No reason provided"}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountRequestDetailModal;
