/* eslint-disable @typescript-eslint/no-explicit-any */
import MarketPlaceImageTab from "../../../Components/Shared/MarketPlaceImageTab";
import { IGear } from "../../../types";
import ReuseButton from "../../Button/ReuseButton";

const ViewGear = ({
  showApproveModal,
  showDeclineModal,
  currentRecord,
}: {
  showApproveModal: (record: any) => void;
  showDeclineModal: (record: any) => void;
  currentRecord: IGear;
}) => {
  return (
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

          </div>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <ReuseButton
            variant="secondary"
            className="!bg-success !border-success"
            onClick={() => showApproveModal(currentRecord)}
          >
            Approve
          </ReuseButton>
          <ReuseButton
            variant="secondary"
            onClick={() => showDeclineModal(currentRecord)}
          >
            Decline
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};

export default ViewGear;
