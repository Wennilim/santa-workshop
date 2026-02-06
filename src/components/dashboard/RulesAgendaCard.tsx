import {
  AgendaIcon,
  CashIcon,
  CostumeIcon,
  DateIcon,
  LocationIcon,
} from "../../assets/icons";
import { cn } from "../../utils/cn";

type TRulesBox = {
  icon: React.ReactNode;
  title: string;
  content: string;
};

type TAgendaBox = {
  time: string;
  title: string;
  content: string;
};

const rulesAgenda = [
  {
    id: 1,
    title: "Max Budget",
    content: "$ 100.00",
    icon: <CashIcon className="size-7 text-[#D97706]" />,
  },
  {
    id: 2,
    title: "Date Event",
    content: "Dec 24th",
    icon: <DateIcon className="size-7 text-[#D97706]" />,
  },
  {
    id: 3,
    title: "Location",
    content: "Space A",
    icon: <LocationIcon className="size-7 text-[#D97706]" />,
  },
  {
    id: 4,
    title: "Costume",
    content: "",
    icon: <CostumeIcon className="size-7 text-[#D97706]" />,
  },
];

const costumeColor = ["bg-[#E63946]", "bg-[#2D6A4F]", "bg-[#FFFFFF]"];

const agenda = [
  {
    id: 1,
    time: "13:00",
    title: "Welcome & Festival Treat",
    content: "Kick off the celebration with Christmas buffet lunch",
  },
  {
    id: 2,
    time: "14:00",
    title: "Team Game & Trivia",
    content: "Mini Games & small gift",
  },
  {
    id: 3,
    time: "15:00",
    title: "Santa Gift Exchange",
    content: "Prepare RM 100 present",
  },
  {
    id: 4,
    time: "16:00",
    title: "Event Conclude",
    content: "Closing & Clean Up session",
  },
];

const RulesBox = ({ icon, title, content }: TRulesBox) => {
  return (
    <div className="flex gap-4 bg-white/60 p-4 rounded-lg m-2 shadow">
      <div className="p-5 rounded-lg bg-[#FEF3C7]/50  flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-[#D97706] text-[14px] md:text-[16px] font-semibold">
          {title}
        </h5>
        <p className="text-[18px] md:text-[24px] text-[#92400E] font-semibold flex gap-2">
          {content === ""
            ? costumeColor.map((color, index) => (
                <div
                  key={index}
                  className={cn("size-7 shadow-lg rounded-full", color)}
                />
              ))
            : content}
        </p>
      </div>
    </div>
  );
};

const AgendaBox = ({ time, title, content }: TAgendaBox) => {
  return (
    <div className="flex gap-2">
      <p className="text-[#D97706] text-[16px] md:text-[18px] font-semibold">
        {time}
      </p>
      <span className="text-[#D97706]">:</span>
      <div className="flex flex-col gap-1">
        <p className="text-[16px] md:text-[18px] text-[#D97706] font-semibold flex gap-2">
          {title}
        </p>
        <p className="text-[12px] md:text-[14px] text-[#613E0F] font-medium flex gap-2">
          {content}
        </p>
      </div>
    </div>
  );
};

export const RulesAgendaCard = () => {
  return (
    <section
      id="rules-agenda"
      aria-label="Rules agenda"
      className={cn(
        "bg-[#FEFAE0] rounded-[50px] border-8 w-full border-[#ffffff] shadow-lg p-4 md:p-6 lg:p-5 xl:p-6 md:px-12 md:py-16 mt-10 md:mt-6 flex flex-col h-full lg:w-[60%]",
      )}
    >
      <div className="flex items-center gap-6 mt-2 mb-6 ml-2">
        <img
          src="/icons/rules-agenda-icon.svg"
          alt="rules"
          className="size-14"
        />
        <h5 className="text-[#92400E] font-bold font-[dynapuff] text-[24px] md:text-[32px]">
          Rules & Agenda
        </h5>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1  ">
        {rulesAgenda.map((rule) => (
          <RulesBox
            key={rule.id}
            icon={rule.icon}
            title={rule.title}
            content={rule.content}
          />
        ))}
      </div>

      <div className="relative flex flex-col gap-4 bg-white/60 p-5 rounded-lg m-2 shadow">
        <div className="flex items-center gap-4">
          <div className="p-5 rounded-lg bg-[#FEF3C7]/50  flex items-center justify-center">
            <AgendaIcon className="size-7 text-[#D97706]" />
          </div>
          <h5 className="text-[20px] md:text-[24px] text-[#92400E] font-semibold flex gap-2">
            Agenda
          </h5>
        </div>
        <div className="flex flex-col gap-3 md:p-4">
          {agenda.map((agenda) => (
            <AgendaBox
              key={agenda.id}
              time={agenda.time}
              title={agenda.title}
              content={agenda.content}
            />
          ))}
        </div>
        <img
          src="/images/agenda-side.png"
          alt="agenda-side"
          className="absolute right-10 size-[151px] lg:size-[100px] xl:size-[151px] bottom-10 hidden sm:block"
        />
      </div>
    </section>
  );
};
