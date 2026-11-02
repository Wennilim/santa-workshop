export const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1") // 在大写字母前加空格
    .replace(/^./, str => str.toUpperCase()) // 首字母大写
    .trim();
};

export function keysToLowerCase<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
  );
}