/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ISubscription } from "../../types";
import { useGetAllSubscriptionQuery } from "../../redux/features/frafolSubscription/susbcriptionApi";
import PricingCard, { IPricingPlan } from "../../Components/Dashboard/Subscription/PricingCard";
import { AllImages } from "../../../public/images/AllImages";
import { FaRegCircleCheck } from "react-icons/fa6";
import Loading from "../../ui/Loading";
import UpdateSubscriptionModal from "../../ui/Modal/Subscription/UpdateSubscriptionModal";

const AdminChoiceManagement = () => {
  const { data, isFetching } = useGetAllSubscriptionQuery(
    {
    },
    { refetchOnMountOrArgChange: true }
  );

  const subscriptionData: ISubscription[] = data?.data || [];

  const features = [
    {
      text: <span
        className="text-base leading-relaxed"

      >
        Profile visibility on the Frafol homepage
      </span>,
      included: true
    },
    {
      text: <span
        className="text-base leading-relaxed"

      >
        Higher placement in client search results
      </span>,
      included: true
    },
    {
      text: <div className='flex items-center gap-2'> <span
        className="text-base leading-relaxed"

      >
        Badge
      </span><div className="flex items-center gap-1 bg-secondary-color px-2 py-1 rounded-full z-20 shadow-md">
          <img
            src={AllImages?.batch}
            width={16}
            height={16}
            alt="Frafol Choice Badge"
            className="size-2.5 sm:size-3 lg:size-4"
          />
          <p className="text-white text-[8px] sm:text-[10px] lg:text-xs font-bold">
            Frafol Choice
          </p>
        </div></div>, included: true
    },
    {
      text: <span
        className="text-base leading-relaxed"
      >
        Priority visibility compared to standard profiles
      </span>, included: true
    },

  ]
  const pricingPlans: IPricingPlan[] = [
    {
      id: 1 * 30,
      name: "Frafol Choice",
      price: 15,
      period: 1,
      icon: AllImages?.batch,
      description: "Short-term profile highlighting."
    },
    {
      id: 3 * 30,
      name: "Frafol Choice",
      price: 45,
      period: 3,
      icon: AllImages?.batch,
      description: "More stable profile visibility over a longer period."
    },
    {
      id: 6 * 30,
      name: "Frafol Choice",
      price: 90,
      period: 6,
      icon: AllImages?.batch,
      popular: true,
      badge: "Best Value",
      description: "Long-term visibility with the best monthly price."
    },
    {
      id: 365,
      name: "Frafol Choice",
      price: 180,
      period: 12,
      icon: AllImages?.batch,
      description: "Full-year profile highlighting without interruptions."
    },
  ];

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const showEditModal = (record: ISubscription) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center py-2 mb-5">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-base-color font-extrabold ">
          Frafol Choice
        </p>
      </div>
      <ul className="mt-5 flex-1 space-y-4 p-2 mb-3 rounded-lg">
        {/* <ReuseButton variant="secondary" className="cursor-pointer bg-warning! border-warning! py-2! !w-fit px-4! text-base! text-secondary-color! font-bold! shadow" disabled>Included</ReuseButton> */}
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">

            <FaRegCircleCheck className="size-4 mt-1.5 shrink-0 text-secondary-color" />


            {feature.text}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 items-baseline">
        {isFetching ? <Loading /> : pricingPlans.map((plan, i) => (
          <PricingCard key={plan?.id} plan={plan} subscriptionData={subscriptionData[i]} showEditModal={showEditModal} />
        ))}
      </div>
      <UpdateSubscriptionModal isAddModalVisible={isEditModalVisible} currentRecord={currentRecord} handleCancel={handleCancel} />
    </div>
  );
};

export default AdminChoiceManagement;
