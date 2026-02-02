type TInfoCardProps = {
  title: string;
  titleColor: string;
  value: string;
  bgColor: string;
};

export const InfoCard = ({
  title,
  titleColor = "#000",
  value,
  bgColor = "#FFF",
}: TInfoCardProps) => {
  return (
    <div
      className={`border-8 border-white px-12 py-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.10)] rounded-[16px] flex flex-col gap-3 items-center max-w-[280px] w-full`}
      style={{ backgroundColor: bgColor }}
    >
      <p
        className="font-bold uppercase text-[12px] md:text-[14px]"
        style={{ color: titleColor }}
      >
        {title}
      </p>
      <p className="font-bold text-black text-[16px] md:text-[20px]">{value}</p>
    </div>
  );
};
