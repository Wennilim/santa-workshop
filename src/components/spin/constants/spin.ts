const PALETTE = ["#FEF9E7", "#D34549", "#E0F2E9", "#FEF9E7", "#3D6B53"];

export interface Segment {
  name: string;
  color: string;
  iconType?: "gift" | "snowflake" | "cloud" | "flower";
}

export const NAMES = [
  "Wen Ni",
  "Chian Lei",
  "Pei Ling",
  "Fiona",
  "Chung",
  "Hong Ming",
  "Kar Jun",
  "YT",
  "Han Wei",
  "Kai Jun",
  "CC",
  "Wan Ying",
  "Kai Ren",
  "Yi Chien",
  "Chloe",
  "Yuqi",
  "Anael",
];

// Helper function to get icon type based on index
export const getIconType = (
  index: number,
): "gift" | "snowflake" | "cloud" | "flower" => {
  const types = ["gift", "snowflake", "cloud", "flower"] as const;
  return types[index % 4];
};

export const SEGMENTS: Segment[] = NAMES.map((name, i) => ({
  name,
  color: PALETTE[i % PALETTE.length],
  iconType: getIconType(i),
}));


export type DecoLoop =
  | { type: "rotate"; from: number; to: number; duration: number }
  | { type: "float"; amount: number; duration: number };

export type DecorationConfig = {
  src: string;
  alt: string;
  className: string;
  delay?: number;
  style?: React.CSSProperties;
  loop?: DecoLoop;
};

export const DECORATIONS: DecorationConfig[] = [
  {
    src: "/images/snow.png",
    alt: "snow icon",
    className: "absolute top-14 -left-1 size-12 hidden lg:block",
    delay: 0.05,
    loop: { type: "rotate", from: -24, to: -18, duration: 3.5 },
  },
  {
    src: "/images/gingerman.png",
    alt: "gingerbread man icon",
    className: "absolute top-14 left-100 size-10 -rotate-24 opacity-50 hidden 2xl:block",
    delay: 0.12,
    loop: { type: "rotate", from: -24, to: -18, duration: 3.5 },
  },
  {
    src: "/icons/cake.svg",
    alt: "cake icon",
    className: "absolute -top-15 left-170 size-10 hidden lg:block",
    delay: 0.18,
    loop: { type: "float", amount: 6, duration: 3.2 },
  },
  {
    src: "/images/candy-canes2.png",
    alt: "candy canes icon",
    className: "absolute top-10 right-20 size-18 opacity-90 hidden lg:block",
    delay: 0.22,
    loop: { type: "float", amount: 8, duration: 4 },
  },
  {
    src: "/images/snow.png",
    alt: "snow icon",
    className: "absolute top-[35%] -right-1 size-12 hidden lg:block",
    delay: 0.28,
    loop: { type: "float", amount: 6, duration: 3.6 },
  },
  {
    src: "/images/candy-canes.png",
    alt: "candy canes icon",
    className: "absolute top-[50%] -left-1 size-12 opacity-90 hidden lg:block",
    delay: 0.32,
    loop: { type: "rotate", from: 0, to: -6, duration: 4.2 },
  },
  {
    src: "/images/candy-canes2.png",
    alt: "candy canes icon",
    className: "absolute bottom-10 left-30 size-12 opacity-90 hidden lg:block",
    delay: 0.38,
    style: { transform: "scaleX(-1)" },
    loop: { type: "float", amount: 8, duration: 4.4 },
  },
  {
    src: "/images/gingerman.png",
    alt: "gingerbread man icon",
    className: "absolute bottom-10 right-30 size-13 rotate-12 opacity-50 hidden lg:block",
    delay: 0.42,
    loop: { type: "rotate", from: 12, to: 18, duration: 3.8 },
  },
];
