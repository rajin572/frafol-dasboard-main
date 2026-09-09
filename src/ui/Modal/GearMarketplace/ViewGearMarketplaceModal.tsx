import { Modal } from "antd";
import { IGear } from "../../../types";
import MarketPlaceImageTab from "../../../Components/Shared/MarketPlaceImageTab";

interface ViewGearMarketplaceModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IGear | null;
}

const ViewGearMarketplaceModal: React.FC<ViewGearMarketplaceModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord);
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <div>
        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-5">
          Gear Details
        </h3>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-2 rounded border border-[#E1E1E1]">
              <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold mb-5 text-secondary-color">
                Owner Information
              </h3>

              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Seller Name
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.authorId?.name}
                </p>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Seller Email
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.authorId?.email}
                </p>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Seller Role
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5 capitalize">
                  {currentRecord?.authorId?.role === "both"
                    ? "Photographer & Videographer"
                    : currentRecord?.authorId?.role}
                </p>
              </div>

              <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold mb-5 text-secondary-color">
                Gear Information
              </h3>

              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Product Name
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.name}
                </p>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Product Category
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.categoryId?.title}
                </p>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Product Price
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.price}€
                </p>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  VAT %
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.vatAmount}%
                </p>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Price After Adding Service Charge & VAT
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.mainPrice}€
                </p>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Condition
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.condition}
                </p>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Shipping Details
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.shippingCompany?.name} - €
                  {currentRecord?.shippingCompany?.price}
                </p>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1">
                  Description
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.description}
                </p>
              </div>
            </div>
            <div className="p-2 rounded border border-[#E1E1E1]">
              <MarketPlaceImageTab images={currentRecord?.gallery || []} />
              <div>
                <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-1 mt-5">
                  Extra Information
                </h4>
                <p className="text-xs sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.extraInformation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewGearMarketplaceModal;
