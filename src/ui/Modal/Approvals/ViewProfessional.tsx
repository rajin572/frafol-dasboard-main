/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseButton from "../../Button/ReuseButton";
import { IProfessional } from "../../../types";
import { AllImages } from "../../../../public/images/AllImages";
import { formatDate } from "../../../utils/dateFormet";

const professionalInitialValues: IProfessional = {
  _id: "",
  profileId: {
    _id: "",
    about: "",
  },
  name: "",
  phone: "",
  dateOfBirth: "",
  sureName: "",
  companyName: "",
  email: "",
  profileImage: "",
  role: "",
  switchRole: "",
  address: "",
  town: "",
  country: "",
  zipCode: "",
  hourlyRate: 0,
  ico: "",
  dic: "",
  ic_dph: "",
  rating: 0,
  totalReview: 0,
  averageRating: 0,
  maxHourlyRate: 0,
  minHourlyRate: 0,
  photographerSpecializations: [],
  videographerSpecializations: [],
  adminVerified: "",
  isBlocked: false,
  isDeleted: false,
  createdAt: "",
  updatedAt: "",
  galery: [],
  travelTowns: [],
};

const ViewProfessional = ({
  showApproveModal,
  showDeclineModal,
  currentRecord = professionalInitialValues,
}: {
  showApproveModal: (record: any) => void;
  showDeclineModal: (record: any) => void;
  currentRecord: IProfessional;
}) => {
  console.log("currentRecord", currentRecord);
  return (
    <div className="p-5">
      <div className="">
        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
          Professional Details
        </h3>
        <div className="flex flex-col justify-center items-center gap-2 mt-5">
          {/* Avatar */}
          <img
            src={AllImages.profile}
            alt={currentRecord?.name}
            className="w-auto h-20 object-cover"
          />
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="text-base sm:text-lg lg:text-xl font-bold text-secondary-color">
              {currentRecord?.name}
            </div>
            <div className="text-sm sm:text-base lg:text-lg font-medium text-secondary-color">
              {currentRecord?.role}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">Email:</span>{" "}
            {currentRecord?.email}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">Phone Number:</span>{" "}
            {currentRecord?.phone}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">Date of Birth:</span>{" "}
            {formatDate(currentRecord?.dateOfBirth)}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">
              Company Name:
            </span>{" "}
            {currentRecord?.companyName}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">Address:</span>{" "}
            {currentRecord?.address}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">Country:</span>{" "}
            {currentRecord?.country}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">Town:</span>{" "}
            {currentRecord?.town}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">Zip Code:</span>{" "}
            {currentRecord?.zipCode}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">ICO:</span>{" "}
            {currentRecord?.ico}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">DIC:</span>{" "}
            {currentRecord?.dic}
          </div>
          <div className="text-xs sm:text-sm lg:text-base font-medium flex items-center gap-1">
            <span className="font-semibold text-secondary-color">IC DPH:</span>{" "}
            {currentRecord?.ic_dph}
          </div>
        </div>

        {currentRecord?.travelTowns?.length > 0 && (
          <div className="text-lg my-5">
            <span className="font-medium text-secondary-color">
              Travel Towns:
            </span>
            <ul className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md flex items-center flex-wrap gap-3">
              {currentRecord.travelTowns.map(
                (specialization, index) => (
                  <li
                    key={index}
                    className="list-none list-inside text-secondary-color"
                  >
                    <span className="text-base-color capitalize">
                      {specialization},
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {currentRecord?.photographerSpecializations?.length > 0 && (
          <div className="text-lg my-5">
            <span className="font-medium text-secondary-color">
              Photographer Specializations:
            </span>
            <ul className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md">
              {currentRecord.photographerSpecializations.map(
                (specialization, index) => (
                  <li
                    key={index}
                    className="list-decimal list-inside text-secondary-color"
                  >
                    <span className="text-base-color capitalize">
                      {specialization}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        {currentRecord?.videographerSpecializations?.length > 0 && (
          <div className="text-lg my-5">
            <span className="font-medium text-secondary-color">
              Videographer Specializations:
            </span>
            <ul className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md">
              {currentRecord.videographerSpecializations.map(
                (specialization, index) => (
                  <li
                    key={index}
                    className="list-decimal list-inside text-secondary-color"
                  >
                    <span className="text-base-color capitalize">
                      {specialization}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        <div className="mt-3">
          <div className="text-lg  ">
            <span className="font-medium text-secondary-color">About:</span>
            <div className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md">
              <span>
                {currentRecord?.profileId?.about}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-lg flex items-center justify-start gap-2">
            <span className="font-medium text-secondary-color">
              Hourly Rate:
            </span>
            <span className="text-sm sm:text-base lg:text-lg text-secondary-color mt-1 p-1.5 bg-gray-100 rounded-md font-extrabold">
              {currentRecord
                ? ` ${currentRecord.minHourlyRate}€ - ${currentRecord.maxHourlyRate}€`
                : "N/A"}
            </span>
          </div>
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
  );
};
export default ViewProfessional;
