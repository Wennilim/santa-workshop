import { MyWishlistCard } from "../components/dashboard/MyWishlistCard";
import { SantaAssignmentCard } from "../components/dashboard/SantaAssignmentCard";
import { SnowGlobeCard } from "../components/dashboard/SnowGlobeCard";

export const DashboardPage = () => {
  return (
    <section id="dashboard" className="lg:p-4">
      <div id="greeting" className="relative flex flex-col">
        <h1 className="text-[36px] md:text-[48px] font-bold font-[dynapuff]">
          Ho ho ho, Wen Ni!{" "}
        </h1>
        <p className="text-[18px] md:text-[24px] text-[#2d6a4f]">
          Your'e currently on the "Nice List". Let's get festive!
        </p>{" "}
        <img
          src="/images/santa-hat.png"
          alt="santa hat"
          className="absolute top-1 -left-1 md:top-1.5 md:-left-1.5 size-4 md:size-6"
        />
      </div>
      <div className="py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <SantaAssignmentCard />
          <SnowGlobeCard />
        </div>
          <MyWishlistCard />
      </div>
    </section>
  );
};
