/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { AllImages } from "../../../public/images/AllImages";

interface TransactionViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}
const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[800px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-color text-center">
            Transaction Details
          </h3>

          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.profile}
              alt={currentRecord?.name}
              className="w-14 h-14 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.name}
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
                Information
              </h2>
              <div className="text-lg  mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">User Name: </span>
                  <span className="">{currentRecord?.name}</span>
                </div>

                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-semibold">Email:</span>
                  <span>{currentRecord?.email}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-semibold">Transaction ID: </span>
                  <span>4646123456789</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-semibold">Time & Date: </span>
                  <span>4:15 PM, 13/02/24</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-semibold">Amount: </span>
                  <span>${currentRecord?.amount}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-semibold">Payment Method: </span>
                  <span>Card</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
                Pricing
              </h2>
              <div className="text-lg  mt-3">
                <div className="flex justify-between border-b border-base-color/10 items-center gap-2 mb-2">
                  <span className="font-semibold">Total Price: </span>
                  <span className="">$300</span>
                </div>

                <div className="flex justify-between border-b border-base-color/10 items-center  gap-2 mb-2">
                  <span className="font-semibold">Tax:</span>
                  <span>$30</span>
                </div>
                <div className="flex justify-between border-b border-base-color items-center  gap-2 pb-2 mb-2">
                  <span className="font-semibold">Shipping Charge: </span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between  items-center  gap-2 pb-2">
                  <span className="font-semibold">Sub-Total: </span>
                  <span>$380</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              Purchased Items
            </h2>
            <div className="text-lg mt-3  flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-background-color p-3 rounded-lg">
                <img
                  src={AllImages.photo}
                  alt={currentRecord?.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="text-xl font-semibold mb-1">
                    {currentRecord?.name}
                  </p>
                  <p className="text-base ">Quantity: 1</p>
                  <p className="text-base ">Price : $100</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-background-color p-3 rounded-lg">
                <img
                  src={AllImages.photo}
                  alt={currentRecord?.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="text-xl font-semibold mb-1">
                    {currentRecord?.name}
                  </p>
                  <p className="text-base ">Quantity: 1</p>
                  <p className="text-base ">Price : $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;
