import { useQuery } from "@tanstack/react-query";
import {
  AgendaIcon,
  CashIcon,
  CostumeIcon,
  DateIcon,
  LocationIcon,
} from "../../assets/icons";
import { cn } from "../../utils/cn";
import { getRulesAgenda } from "../../api/getRulesAgenda";

type TRulesBox = {
  icon: React.ReactNode;
  title: string;
  content: string;
  costumeColor: string[];
};

type TAgendaBox = {
  time: { hour: number; minute: number };
  title: string;
  content: string;
};

const RulesBox = ({ icon, title, content, costumeColor }: TRulesBox) => {
  return (
    <div className="flex gap-4 bg-white/60 p-4 rounded-lg m-2 shadow">
      <div className="p-5 rounded-lg bg-[#FEF3C7]/50  flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col gap-2 min-w-0">
        <h5 className="text-[#D97706] text-[14px] md:text-[16px] font-semibold">
          {title}
        </h5>
        <div className="text-[18px] md:text-[24px] text-[#92400E] font-semibold flex gap-2">
          {content === ""
            ? costumeColor?.map((color, index) => {
                return (
                  <div
                    key={index}
                    className={cn("size-7 lg:size-8 lg:mt-3 shadow-lg rounded-full")}
                    style={{ backgroundColor: color }}
                  />
                );
              })
            : <span className="block line-clamp-2 w-full">{content}</span>}
        </div>
      </div>
    </div>
  );
};

const AgendaBox = (agenda: TAgendaBox) => {
  const formattedTime = `${agenda.time.hour
    .toString()
    .padStart(2, "0")}:${agenda.time.minute.toString().padStart(2, "0")}`;

  return (
    <div className="flex gap-2">
      <p className="text-[#D97706] text-[16px] md:text-[18px] font-semibold">
        {formattedTime}
      </p>
      <span className="text-[#D97706]">:</span>
      <div className="flex flex-col gap-1">
        <p className="text-[16px] md:text-[18px] text-[#D97706] font-semibold flex gap-2">
          {agenda.title}
        </p>
        <p className="text-[12px] md:text-[14px] text-[#613E0F] font-medium flex gap-2">
          {agenda.content}
        </p>
      </div>
    </div>
  );
};

export const RulesAgendaCard = () => {
  const getRulesAgendaQuery = useQuery({
    queryKey: ["rules-agenda"],
    queryFn: getRulesAgenda,
  });

  const agenda = getRulesAgendaQuery?.data?.agenda;
  const budget = getRulesAgendaQuery?.data?.max_budget;
  const date = getRulesAgendaQuery?.data?.date_event;
  const location = getRulesAgendaQuery?.data?.location;
  const costumeColor = getRulesAgendaQuery?.data?.costume_color;
  const hasBudget = budget != null && budget !== "";
  const eventDate = date ? new Date(date) : null;
  const hasValidDate = eventDate && !Number.isNaN(eventDate.getTime());
  const formattedDate = hasValidDate
    ? eventDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "To be announced";
  const hasRulesAgenda =
    hasBudget ||
    hasValidDate ||
    Boolean(location) ||
    Boolean(costumeColor?.length) ||
    Boolean(agenda?.length);
  const emptyState = getRulesAgendaQuery.isPending
    ? {
        title: "Loading event details...",
        description: "Getting everything ready for the celebration.",
      }
    : getRulesAgendaQuery.isError
      ? {
          title: "Event details are unavailable",
          description: "Please check back in a moment.",
        }
      : !hasRulesAgenda
        ? {
            title: "Event details are coming soon",
            description:
              "Budget, date, location and agenda will appear here once confirmed.",
          }
        : null;

  const rulesAgenda = [
    {
      id: 1,
      title: "Max Budget",
      content: hasBudget ? `$ ${budget}` : "To be announced",
      icon: <CashIcon className="size-7 text-[#D97706]" />,
    },
    {
      id: 2,
      title: "Date Event",
      content: formattedDate,
      icon: <DateIcon className="size-7 text-[#D97706]" />,
    },
    {
      id: 3,
      title: "Location",
      content: location || "To be announced",
      icon: <LocationIcon className="size-7 text-[#D97706]" />,
    },
    {
      id: 4,
      title: "Costume",
      content: costumeColor?.length ? "" : "To be announced",
      icon: <CostumeIcon className="size-7 text-[#D97706]" />,
    },
  ];

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

      {emptyState ? (
        <div
          role="status"
          className="m-2 flex min-h-[360px] flex-1 flex-col items-center justify-center rounded-2xl bg-white/60 px-6 py-12 text-center shadow"
        >
          <img
            src="/images/agenda-side.png"
            alt=""
            className="mb-6 w-44"
          />
          <h6 className="font-[dynapuff] text-[22px] font-bold text-[#92400E] md:text-[28px]">
            {emptyState.title}
          </h6>
          <p className="mt-2 max-w-md text-[15px] font-medium text-[#613E0F]/70 md:text-[17px]">
            {emptyState.description}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {rulesAgenda.map((rule) => (
              <RulesBox key={rule.id} {...rule} costumeColor={costumeColor} />
            ))}
          </div>

          <div className="relative m-2 flex flex-col gap-4 rounded-lg bg-white/60 p-5 shadow">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-lg bg-[#FEF3C7]/50 p-5">
                <AgendaIcon className="size-7 text-[#D97706]" />
              </div>
              <h5 className="flex gap-2 text-[20px] font-semibold text-[#92400E] md:text-[24px]">
                Agenda
              </h5>
            </div>
            <div className="flex flex-col gap-3 sm:pr-[190px] md:py-4 md:pl-4 lg:pr-[140px] xl:pr-[190px]">
              {agenda?.length ? (
                agenda.map((item: TAgendaBox) => (
                  <AgendaBox key={item.title} {...item} />
                ))
              ) : (
                <p className="text-[15px] font-medium text-[#613E0F]/70 md:text-[17px]">
                  Agenda will be announced soon.
                </p>
              )}
            </div>
            <img
              src="/images/agenda-side.png"
              alt=""
              className="absolute bottom-10 right-10 hidden size-[151px] sm:block lg:size-[100px] xl:size-[151px]"
            />
          </div>
        </>
      )}
    </section>
  );
};
