/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "../../../lib/utils";
import { ISubscription } from "../../../types";
import ReuseButton from "../../../ui/Button/ReuseButton";

export interface IPricingPlan {
    id: number;
    name: string;
    price: number;
    period: number;
    popular?: boolean;
    badge?: string;
    icon: string;
    description: string
}

interface PricingCardProps {
    plan: IPricingPlan;
    subscriptionData: ISubscription;
    showEditModal: (record: any) => void
}
export default function PricingCard({
    plan, subscriptionData, showEditModal
}: PricingCardProps) {
    const {
        period,
    } = plan;

    return (
        <div
            className={cn(
                "max-w-[400px]  relative flex flex-col rounded-2xl border border-[#0000001A]  bg-white transition-all duration-300 p-5 shadow hover:shadow-lg hover:-translate-y-1 hover:scale-101 hover:border-[#0000001A]",
            )}
        >

            {/* Icon + Plan Name */}
            <div className="">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold">
                        {period} month
                    </h3>
                </div>
                <div className="mt-2 h-1 w-full border-b border-dashed border-[#D4DBEA]"></div>


                <div className="mt-2 flex items-baseline">
                    <p className="text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C] font-black ">
                        €{subscriptionData?.price}
                    </p>
                </div>

            </div>

            <p className="text-lg text-[#99A1AF] my-5">{plan?.description}</p>
            {/* Subscription Status */}
            <div className="">
                <ReuseButton variant="secondary" onClick={() => showEditModal({ id: subscriptionData?._id, price: subscriptionData?.price, period: plan?.period })} >Edit</ReuseButton>
            </div>
        </div>
    );
}
