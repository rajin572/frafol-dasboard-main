/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rate } from "antd";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ item }: { item: any }) => {
  return (
    <div className="flex flex-col justify-stretch items-center xl:gap-10 bg-transparent border border-[#E1E1E1] overflow-hidden  rounded-xl">
      <div className="flex flex-col items-center md:items-start p-3">
        <div className="flex items-center justify-start gap-2 mb-2">
          <img
            src={item.image}
            alt="Testimonial"
            className=" h-10 w-10 rounded-full object-cover mx-auto"
          />
          <p className="w-full text-lg sm:text-xl text-[#00000080] text-center mb-1 font-bold ">
            {item.name}
          </p>
        </div>
        <Rate
          disabled
          defaultValue={2.5}
          allowHalf
          character={<FaStar className="size-5 mb-2" />}
        />
        <h1 className=" text-[#00000080] tracking-wide">{item.message}</h1>
      </div>
    </div>
  );
};

export default TestimonialCard;
